<template>
    <div class="outer-container">
        <div class="inner-container" :class="{ focussed: isFocussed }">
            <i class="search-icon bi-search"></i>
            <input
                ref="userInputRef"
                class="input"
                type="text"
                autofocus
                v-model="searchTerm"
                @focus="onFocus"
                @blur="onBlur"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, defineEmits } from "vue";
import { vueEventEmitter } from "../../VueEventEmitter";

const emit = defineEmits<{
    (e: "searchTermChanged", searchTerm: string): void;
}>();

const isFocussed = ref<boolean>(false);
const searchTerm = ref<string>("");
const userInputRef = ref<HTMLInputElement | null>(null);

const focusOnUserInput = (): void => userInputRef.value?.focus();

const onFocus = (): void => {
    isFocussed.value = true;
};

const onBlur = (): void => {
    isFocussed.value = false;
};

const registerVueEventListeners = (): void => vueEventEmitter.on("MainWindowShown", () => focusOnUserInput());

onMounted(() => registerVueEventListeners());

watch(searchTerm, () => emit("searchTermChanged", searchTerm.value));
</script>

<style scoped>
.outer-container {
    padding: var(--ueli-spacing-4x) var(--ueli-spacing-4x);
    box-sizing: border-box;
    display: flex;
    width: 100%;
    -webkit-app-region: drag;
}

.inner-container {
    padding-bottom: var(--ueli-spacing-2x);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: 2px solid var(--ueli-black-400);
    transition: var(--ueli-transition);
    -webkit-app-region: no-drag;
}

.inner-container.focussed {
    border-bottom: 2px solid var(--ueli-blue);
}

.search-icon {
    color: var(--ueli-white);
    font-size: var(--ueli-font-size-16);
    transition: var(--ueli-transition);
}

.input {
    background-color: transparent;
    border: none;
    color: var(--ueli-white);
    width: 100%;
    font-family: var(--ueli-font-family);
    font-size: var(--ueli-font-size-24);
    font-weight: var(--ueli-font-weight-600);
    padding: 0 var(--ueli-spacing-2x);
}

.input:focus {
    border: none;
    outline: none;
}
</style>
