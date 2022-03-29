<template>
    <div
        class="container"
        :class="{ hovered: hovered }"
        :id="elementId"
        @click="onClick"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
    >
        <div class="icon-container">
            <SearchResultIcon :icon="item.icon" />
        </div>
        <div class="info-container">
            <div class="name">
                {{ item.name }}
            </div>
            <div class="description">
                {{ item.description }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { SearchResultItem } from "../../../common/SearchResult/SearchResultItem";
import { ObjectUtility } from "../../../common/ObjectUtility";
import SearchResultIcon from "./SearchResultIcon.vue";

const { item, position, hovered } = defineProps<{
    item: SearchResultItem;
    position: number;
    hovered: boolean;
}>();

const emit = defineEmits<{
    (e: "openLocation", item: SearchResultItem): void;
    (e: "execute", item: SearchResultItem): void;
    (e: "mouseenter"): void;
    (e: "mouseleave"): void;
}>();

const onMouseEnter = (): void => emit("mouseenter");
const onMouseLeave = (): void => emit("mouseleave");
const elementId = computed<string>(() => `search-result-position-${position}`);

const onClick = (mouseEvent: MouseEvent): void =>
    mouseEvent.ctrlKey || mouseEvent.metaKey
        ? emit("openLocation", ObjectUtility.clone(item))
        : emit("execute", ObjectUtility.clone(item));
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: var(--ueli-spacing-2x) var(--ueli-spacing-4x);
    box-sizing: border-box;
    transition: var(--ueli-transition);
    user-select: none;
}

.container.hovered {
    background-color: var(--ueli-black-800);
}

.container:active {
    background-color: var(--ueli-black-500);
}

.icon-container {
    height: var(--search-result-icon-size);
    width: var(--search-result-icon-size);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.info-container {
    padding: 0 var(--ueli-spacing-3x);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: hidden;
}

.name,
.description {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.name {
    font-size: var(--ueli-font-size-16);
    font-weight: var(--ueli-font-weight-600);
    color: var(--ueli-white);
}

.description {
    font-size: var(--ueli-font-size-11);
    font-weight: var(--ueli-font-weight-400);
    color: var(--ueli-black-300);
}
</style>
