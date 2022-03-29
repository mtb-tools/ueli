<template>
    <div>
        <img class="icon" :src="icon.dataUrl" />
    </div>
</template>

<script lang="ts" setup>
import { DataUrlSearchResultItemIcon } from "../../../common/SearchResult/DataUrlSearchResultItemIcon";

defineProps<{ icon: DataUrlSearchResultItemIcon }>();
</script>

<style scoped>
.icon {
    width: 100%;
    vertical-align: middle;
}
</style>
