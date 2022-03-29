<template>
    <div>
        <FilePathSearchResultIcon v-if="isFilePathIcon" :icon="icon" />
        <DataUrlSearchResultIcon v-if="isDataUrlIcon" :icon="icon" />
    </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from "vue";
import { SearchResultItemIcon } from "../../../common/SearchResult/SearchResultItemIcon";
import { SearchResultItemIconType } from "../../../common/SearchResult/SearchResultItemIconType";
import FilePathSearchResultIcon from "./FilePathSearchResultIcon.vue";
import DataUrlSearchResultIcon from "./DataUrlSearchResultIcon.vue";

const { icon } = defineProps<{ icon: SearchResultItemIcon }>();

const isFilePathIcon = computed(() => icon.type === SearchResultItemIconType.FilePath);
const isDataUrlIcon = computed(() => icon.type === SearchResultItemIconType.DataUrl);
</script>
