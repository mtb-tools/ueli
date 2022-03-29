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
                        @valueChanged="thresholdChanged"
                    />
                </template>
            </USetting>

            <USetting class="setting">
                <template v-slot:label>Automatic rescan</template>
                <template v-slot:body>
                    <UToggle
                        :toggled="settings.searchEngineSettings.automaticRescanEnabled"
                        @toggle="toggleAutomaticRescanEnabled"
                    />
                </template>
            </USetting>

            <USetting class="setting" v-if="settings.searchEngineSettings.automaticRescanEnabled">
                <template v-slot:label> Automatic rescan interval </template>
                <template v-slot:body>
                    <UNumberInput
                        :value="settings.searchEngineSettings.automaticRescanIntervalInSeconds"
                        @changed="rescanIntervalChanged"
                    />
                </template>
            </USetting>
        </template>
    </USettingList>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { IpcChannel } from "../../../common/IpcChannel";
import { ObjectUtility } from "../../../common/ObjectUtility";
import { Settings } from "../../../common/Settings";
import { NotificationData } from "../../NotificationData";
import { NotificationType } from "../../NotificationType";
import { vueEventEmitter } from "../../VueEventEmitter";
import { UNumberInput, USliderInput, USetting, USettingList, UToggle } from "ueli-designsystem";

export default defineComponent({
    components: {
        UNumberInput,
        USetting,
        USettingList,
        USliderInput,
        UToggle,
    },

    setup() {
        const settings = ref<Settings>(window.Bridge.ipcRenderer.sendSync<unknown, Settings>(IpcChannel.GetSettings));

        const successfullySavedSettingsNotification = (): NotificationData => {
            return {
                message: "Settings have been updated",
                autoHide: true,
                autoHideDuration: 2500,
                type: NotificationType.Success,
                icon: "check",
            };
        };

        const failedToSaveSettingsNotification = (error: unknown): NotificationData => {
            return {
                message: `Failed to save settings. Reason ${error}`,
                autoHide: false,
                type: NotificationType.Danger,
                icon: "exclamation-triangle-fill",
            };
        };

        const saveSettings = (): Promise<void> => {
            return window.Bridge.ipcRenderer.invoke<Settings, void>(
                IpcChannel.UpdateSettings,
                ObjectUtility.clone<Settings>(settings.value)
            );
        };

        const thresholdChanged = async (threshold: number): Promise<void> => {
            settings.value.searchEngineSettings.threshold = threshold;

            try {
                await saveSettings();
                vueEventEmitter.emit("Notification", successfullySavedSettingsNotification());
            } catch (error) {
                vueEventEmitter.emit("Notification", failedToSaveSettingsNotification(error));
            }
        };

        const rescanIntervalChanged = async (interval: number): Promise<void> => {
            settings.value.searchEngineSettings.automaticRescanIntervalInSeconds = interval;

            try {
                await saveSettings();
                vueEventEmitter.emit("Notification", successfullySavedSettingsNotification());
            } catch (error) {
                vueEventEmitter.emit("Notification", failedToSaveSettingsNotification(error));
            }
        };

        const toggleAutomaticRescanEnabled = async (): Promise<void> => {
            settings.value.searchEngineSettings.automaticRescanEnabled =
                !settings.value.searchEngineSettings.automaticRescanEnabled;

            try {
                await saveSettings();
                vueEventEmitter.emit("Notification", successfullySavedSettingsNotification());
            } catch (error) {
                vueEventEmitter.emit("Notification", failedToSaveSettingsNotification(error));
            }
        };

        return {
            failedToSaveSettingsNotification,
            rescanIntervalChanged,
            saveSettings,
            settings,
            successfullySavedSettingsNotification,
            thresholdChanged,
            toggleAutomaticRescanEnabled,
        };
    },
});
</script>

<style scoped>
.setting:not(:last-child) {
    border-bottom: var(--ueli-border);
}
</style>
