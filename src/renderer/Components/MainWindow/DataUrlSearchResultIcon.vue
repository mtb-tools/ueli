<template>
    <div>
        <img class="icon" :src="icon.dataUrl" />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { DataUrlSearchResultItemIcon } from "../../../common/SearchResult/DataUrlSearchResultItemIcon";

export default defineComponent({
    props: {
        icon: {
            type: <PropType<DataUrlSearchResultItemIcon>>Object,
            required: true,
        },
    },
});
</script>

<style scoped>
.icon {
    width: 100%;
    vertical-align: middle;
}
</style>
