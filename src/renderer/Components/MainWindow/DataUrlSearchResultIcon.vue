<template>
    <div>
        <img class="icon" :src="dataUrl" />
    </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from "vue";
import { DataUrlSearchResultItemIcon } from "../../../common/SearchResult/DataUrlSearchResultItemIcon";

const { icon } = defineProps<{ icon: DataUrlSearchResultItemIcon }>();
const dataUrl = computed<string>(() => icon.dataUrl);
</script>

<style scoped>
.icon {
    width: 100%;
    vertical-align: middle;
}
</style>
