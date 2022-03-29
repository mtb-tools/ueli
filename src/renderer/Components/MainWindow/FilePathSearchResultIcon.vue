<template>
    <div>
        <img class="icon" :src="icon.filePath" />
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { LocalFilePathSearchResultItemIcon } from "../../../common/SearchResult/LocalFilePathSearchResultItemIcon";

defineProps<{ icon: LocalFilePathSearchResultItemIcon }>();
</script>

<style scoped>
.icon {
    width: 100%;
    vertical-align: middle;
}
</style>
