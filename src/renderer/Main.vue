<template>
    <div class="main-container">
        <div class="user-input-container">
            <UserInput @searchTermChanged="onSearchTermChanged" />
        </div>
        <div class="search-result-list-container" id="search-result-list-container">
            <SearchResultList
                :searchResultItems="searchResultItems"
                @executionRequested="onExecutionRequested"
                @openLocationRequested="onOpenLocationRequested"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import UserInput from "./Components/MainWindow/UserInput.vue";
import SearchResultList from "./Components/MainWindow/SearchResultList.vue";
import { vueEventEmitter } from "./VueEventEmitter";
import { SearchResultItem } from "../common/SearchResult/SearchResultItem";
import { IpcChannel } from "../common/IpcChannel";

import "ueli-designsystem/variables.css";
import "./Styles/shared.css";

export default defineComponent({
    components: {
        SearchResultList,
        UserInput,
    },

    setup() {
        const searchResultItems = ref<SearchResultItem[]>([]);

        const handleError = (error: unknown): void => console.error(`Handled error: ${error}`);

        const onExecutionRequested = async (searchResultItem: SearchResultItem): Promise<void> => {
            try {
                await window.Bridge.ipcRenderer.invoke(IpcChannel.Execute, searchResultItem);
            } catch (error) {
                handleError(error);
            }
        };

        const onOpenLocationRequested = async (searchResultItem: SearchResultItem): Promise<void> => {
            try {
                await window.Bridge.ipcRenderer.invoke(IpcChannel.OpenLocation, searchResultItem);
            } catch (error) {
                handleError(error);
            }
        };

        const registerIpcEventListeners = (): void =>
            window.Bridge.ipcRenderer.on(IpcChannel.MainWindowShown, () => vueEventEmitter.emit("MainWindowShown"));

        const registerVueEventListeners = (): void =>
            vueEventEmitter.on("GlobalKeyDown", (event: KeyboardEvent) => onGlobalKeyDown(event));

        const onGlobalKeyDown = (keyboardEvent: KeyboardEvent): void => {
            switch (keyboardEvent.key) {
                case "ArrowUp":
                case "ArrowDown":
                    keyboardEvent.preventDefault();
                    vueEventEmitter.emit("UserInputArrowKeyPressed", keyboardEvent.key);
                    break;

                case "Enter":
                    keyboardEvent.preventDefault();
                    vueEventEmitter.emit("UserInputEnterPressed", keyboardEvent.ctrlKey || keyboardEvent.metaKey);
                    break;

                case "Escape":
                    keyboardEvent.preventDefault();
                    window.Bridge.ipcRenderer.send(IpcChannel.EscapePressed);
                    break;
            }
        };

        const onSearchTermChanged = async (searchTerm: string): Promise<void> => {
            try {
                searchResultItems.value = await window.Bridge.ipcRenderer.invoke<string, SearchResultItem[]>(
                    IpcChannel.Search,
                    searchTerm
                );
            } catch (error) {
                handleError(error);
            }
        };

        onMounted(() => {
            registerIpcEventListeners();
            registerVueEventListeners();
        });

        return {
            onExecutionRequested,
            onGlobalKeyDown,
            onOpenLocationRequested,
            onSearchTermChanged,
            registerIpcEventListeners,
            registerVueEventListeners,
            searchResultItems,
        };
    },
});
</script>

<style scoped>
.main-container {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.user-input-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
}

.search-result-list-container {
    width: 100%;
    flex-grow: 1;
    overflow-y: auto;
}
</style>
