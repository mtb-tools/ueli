<template>
    <div>
        <FilePathSearchResultIcon v-if="isFilePathIcon" :icon="icon" />
        <DataUrlSearchResultIcon v-if="isDataUrlIcon" :icon="icon" />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { SearchResultItemIcon } from "../../../common/SearchResult/SearchResultItemIcon";
import { SearchResultItemIconType } from "../../../common/SearchResult/SearchResultItemIconType";
import FilePathSearchResultIcon from "./FilePathSearchResultIcon.vue";
import DataUrlSearchResultIcon from "./DataUrlSearchResultIcon.vue";

export default defineComponent({
    props: {
        icon: {
            type: <PropType<SearchResultItemIcon>>Object,
            required: true,
        },
    },

    components: {
        DataUrlSearchResultIcon,
        FilePathSearchResultIcon,
    },

    setup({ icon }) {
        const isFilePathIcon = computed(() => icon.type === SearchResultItemIconType.FilePath);
        const isDataUrlIcon = computed(() => icon.type === SearchResultItemIconType.DataUrl);

        return {
            isDataUrlIcon,
            isFilePathIcon,
        };
    },
});
</script>
