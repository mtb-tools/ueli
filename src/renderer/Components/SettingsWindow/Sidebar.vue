<template>
    <div>
        <SidebarOptionGroupComponent
            v-for="(optionGroup, index) in optionGroups"
            :key="index"
            :optionGroup="optionGroup"
            @selectionChanged="selectionChanged"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import SidebarOptionGroupComponent from "./SidebarOptionGroup.vue";
import { SidebarOptionGroup } from "../../SidebarOptionGroup";

export default defineComponent({
    components: {
        SidebarOptionGroupComponent,
    },

    setup() {
        const router = useRouter();

        const optionGroups = ref<SidebarOptionGroup[]>([
            {
                label: "ueli",
                key: "ueli",
                options: [
                    {
                        label: "General",
                        path: "/general",
                        icon: "bi-gear-wide-connected",
                    },
                    {
                        label: "Search Engine",
                        path: "/search-engine",
                        icon: "bi-search",
                    },
                ],
            },
        ]);

        const selectionChanged = (groupKey: string, selectedIndex: number): void => {
            optionGroups.value.forEach((optionGroup) => {
                if (optionGroup.key === groupKey) {
                    optionGroup.options.forEach((option, index) => {
                        const selected = index === selectedIndex;
                        option.selected = selected;
                    });
                }
            });
        };

        const registerNavigationEventListeners = (): void => {
            router.afterEach((navigatedTo) => {
                optionGroups.value.forEach((optionGroup) => {
                    optionGroup.options.forEach((option, index) => {
                        if (option.path === navigatedTo.path) {
                            selectionChanged(optionGroup.key, index);
                        }
                    });
                });
            });
        };

        onMounted(() => {
            registerNavigationEventListeners();
            router.push("/general");
        });

        return {
            optionGroups,
            selectionChanged,
        };
    },
});
</script>

<style scoped></style>
