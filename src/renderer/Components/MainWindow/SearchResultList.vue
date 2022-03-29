<template>
    <div class="container">
        <SearchResult
            v-for="(searchResultItem, index) in searchResultItems"
            :key="index"
            :item="searchResultItem"
            :position="index"
            :hovered="currentlyHoveredPosition === index"
            @mouseenter="onMouseEnter(index)"
            @mouseleave="onMouseLeave(index)"
            @execute="execute"
            @openLocation="openLocation"
        />
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, defineEmits, defineProps } from "vue";
import SearchResult from "./SearchResult.vue";
import { SearchResultItem } from "../../../common/SearchResult/SearchResultItem";
import { vueEventEmitter } from "../../VueEventEmitter";
import { ObjectUtility } from "../../../common/ObjectUtility";

const emit = defineEmits<{
    (e: "executionRequested", searchResultItem: SearchResultItem): void;
    (e: "openLocationRequested", searchResultItem: SearchResultItem): void;
}>();

const props = defineProps<{ searchResultItems: SearchResultItem[] }>();

const currentlyHoveredPosition = ref<number | undefined>(0);

const onMouseEnter = (position: number): void => {
    currentlyHoveredPosition.value = position;
};

const onMouseLeave = (position: number): void => {
    if (currentlyHoveredPosition.value === position) {
        currentlyHoveredPosition.value = undefined;
    }
};

const execute = (searchResultItem: SearchResultItem): void =>
    emit("executionRequested", ObjectUtility.clone(searchResultItem));

const openLocation = (searchResultItem: SearchResultItem): void =>
    emit("openLocationRequested", ObjectUtility.clone(searchResultItem));

const elementIsOutOfView = (container: HTMLDivElement, element: HTMLDivElement): boolean => {
    const scrolledFromTop = container.scrollTop;
    const scrollContainerHeight = container.clientHeight;
    const elementOffsetTop = element.offsetTop - container.offsetTop;
    const elementHeight = element.clientHeight;

    return (
        scrolledFromTop + scrollContainerHeight <= elementOffsetTop + elementHeight ||
        elementOffsetTop <= scrolledFromTop
    );
};

const scrollElementIntoViewIfNecessary = (): void => {
    const searchResultListContainer = document.getElementById("search-result-list-container") as
        | HTMLDivElement
        | undefined;

    const currentlySelectedElement = <HTMLDivElement | undefined>(
        document.getElementById(`search-result-position-${currentlyHoveredPosition.value}`)
    );

    if (searchResultListContainer && currentlySelectedElement) {
        if (elementIsOutOfView(searchResultListContainer, currentlySelectedElement)) {
            currentlySelectedElement.scrollIntoView({ behavior: "smooth" });
        }
    }
};

const currentlySelectedIndexChange = (direction: "ArrowUp" | "ArrowDown"): void => {
    const minimumIndex = 0;
    const maximumIndex = props.searchResultItems.length - 1;

    if (currentlyHoveredPosition.value === undefined) {
        currentlyHoveredPosition.value = 0;
        return;
    }

    if (direction === "ArrowUp") {
        currentlyHoveredPosition.value =
            currentlyHoveredPosition.value === minimumIndex ? maximumIndex : currentlyHoveredPosition.value - 1;
    }

    if (direction === "ArrowDown") {
        currentlyHoveredPosition.value =
            currentlyHoveredPosition.value === maximumIndex ? minimumIndex : currentlyHoveredPosition.value + 1;
    }

    scrollElementIntoViewIfNecessary();
};

watch(
    () => props.searchResultItems,
    () => {
        if (props.searchResultItems.length > 0) {
            currentlyHoveredPosition.value = 0;
        }
    }
);

onMounted(() => {
    vueEventEmitter.on("UserInputArrowKeyPressed", (key) => {
        currentlySelectedIndexChange(key);
    });

    vueEventEmitter.on("UserInputEnterPressed", (ctrlOrMetaPressed?: boolean) => {
        const currentlySelectedItem = props.searchResultItems.find(
            (_, index) => index === currentlyHoveredPosition.value
        );

        if (currentlySelectedItem) {
            ctrlOrMetaPressed
                ? openLocation(ObjectUtility.clone(currentlySelectedItem))
                : execute(ObjectUtility.clone(currentlySelectedItem));
        }
    });
});
</script>

<style scoped></style>
