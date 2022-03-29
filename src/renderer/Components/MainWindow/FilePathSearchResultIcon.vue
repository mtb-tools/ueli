<template>
    <div>
        <img class="icon" :src="filePath" />
    </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from "vue";
import { LocalFilePathSearchResultItemIcon } from "../../../common/SearchResult/LocalFilePathSearchResultItemIcon";
const { icon } = defineProps<{ icon: LocalFilePathSearchResultItemIcon }>();
const filePath = computed<string>(() => icon.filePath);
</script>

<style scoped>
.icon {
    width: 100%;
    vertical-align: middle;
}
</style>
