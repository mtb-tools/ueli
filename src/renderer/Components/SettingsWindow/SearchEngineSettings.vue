<template>
    <USettingList title="Search Engine Settings">
        <template v-slot:settings>
            <USetting class="setting">
                <template v-slot:label>Fuzzyness</template>
                <template v-slot:body>
                    <USliderInput
                        :min="0"
                        :max="1"
                        :step="0.1"
                        :value="settings.searchEngineSettings.threshold"
                        :displayValue="true"
                        @valueChanged="updateThreshold"
                    />
                </template>
            </USetting>

            <USetting class="setting">
                <template v-slot:label>Automatic rescan</template>
                <template v-slot:body>
                    <UToggle
                        :toggled="settings.searchEngineSettings.automaticRescanEnabled"
                        @toggle="updateAutomaticRescanEnabled"
                    />
                </template>
            </USetting>

            <USetting class="setting" v-if="settings.searchEngineSettings.automaticRescanEnabled">
                <template v-slot:label> Automatic rescan interval </template>
                <template v-slot:body>
                    <UNumberInput
                        :value="settings.searchEngineSettings.automaticRescanIntervalInSeconds"
                        @changed="updateRescanInterval"
                    />
                </template>
            </USetting>
        </template>
    </USettingList>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { IpcChannel } from "../../../common/IpcChannel";
import { Settings } from "../../../common/Settings";
import { UNumberInput, USliderInput, USetting, USettingList, UToggle } from "ueli-designsystem";
import { saveSettings } from "./Actions";
import { ObjectUtility } from "../../../common/ObjectUtility";

const settings = ref<Settings>(window.Bridge.ipcRenderer.sendSync<unknown, Settings>(IpcChannel.GetSettings));

const save = async (): Promise<void> => saveSettings(ObjectUtility.clone<Settings>(settings.value));

const updateThreshold = async (threshold: number): Promise<void> => {
    settings.value.searchEngineSettings.threshold = threshold;
    await save();
};

const updateRescanInterval = async (interval: number): Promise<void> => {
    settings.value.searchEngineSettings.automaticRescanIntervalInSeconds = interval;
    await save();
};

const updateAutomaticRescanEnabled = async (enabled: boolean): Promise<void> => {
    settings.value.searchEngineSettings.automaticRescanEnabled = enabled;
    await save();
};
</script>

<style scoped>
.setting:not(:last-child) {
    border-bottom: var(--ueli-border);
}
</style>
