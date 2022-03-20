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
import { defineComponent } from "vue";
import UserInput from "./Components/MainWindow/UserInput.vue";
import SearchResultList from "./Components/MainWindow/SearchResultList.vue";
import { vueEventEmitter } from "./VueEventEmitter";
import { SearchResultItem } from "../common/SearchResult/SearchResultItem";
import { IpcChannel } from "../common/IpcChannel";

import "ueli-designsystem/variables.css";
import "./Styles/shared.css";

interface Data {
    searchResultItems: SearchResultItem[];
}

export default defineComponent({
    components: {
        SearchResultList,
        UserInput,
    },

    data(): Data {
        return {
            searchResultItems: [],
        };
    },

    methods: {
        onGlobalKeyDown(keyboardEvent: KeyboardEvent): void {
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
                    this.Bridge.ipcRenderer.send(IpcChannel.EscapePressed);
                    break;
            }
        },

        async onSearchTermChanged(searchTerm: string): Promise<void> {
            try {
                this.searchResultItems = await this.Bridge.ipcRenderer.invoke<string, SearchResultItem[]>(
                    IpcChannel.Search,
                    searchTerm
                );
            } catch (error) {
                if (error instanceof Error) {
                    this.handleError(error);
                }
            }
        },

        async onExecutionRequested(searchResultItem: SearchResultItem): Promise<void> {
            try {
                await this.Bridge.ipcRenderer.invoke(IpcChannel.Execute, searchResultItem);
            } catch (error) {
                if (error instanceof Error) {
                    this.handleError(error);
                }
            }
        },

        async onOpenLocationRequested(searchResultItem: SearchResultItem): Promise<void> {
            try {
                await this.Bridge.ipcRenderer.invoke(IpcChannel.OpenLocation, searchResultItem);
            } catch (error) {
                if (error instanceof Error) {
                    this.handleError(error);
                }
            }
        },

        registerIpcEventListeners(): void {
            this.Bridge.ipcRenderer.on(IpcChannel.MainWindowShown, () => vueEventEmitter.emit("MainWindowShown"));
        },

        registerVueEventListeners(): void {
            vueEventEmitter.on("GlobalKeyDown", (event: KeyboardEvent) => this.onGlobalKeyDown(event));
        },

        handleError(error: Error): void {
            console.error(`Handled error: ${error}`);
        },
    },

    mounted(): void {
        this.registerIpcEventListeners();
        this.registerVueEventListeners();
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
