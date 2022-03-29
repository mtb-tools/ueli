<template>
    <USettingList title="General settings">
        <template v-slot:settings>
            <USetting>
                <template v-slot:label>Hide window on blur</template>
                <template v-slot:body>
                    <UToggle :toggled="settings.generalSettings.hideWindowOnBlur" @toggle="updateHideWindowOnBlur" />
                </template>
            </USetting>
        </template>
    </USettingList>
</template>

<script lang="ts" setup>
import { USettingList, USetting, UToggle } from "ueli-designsystem";
import { Settings } from "../../../common/Settings";
import { IpcChannel } from "../../../common/IpcChannel";
import { ref } from "vue";
import { saveSettings } from "./Actions";
import { ObjectUtility } from "../../../common/ObjectUtility";

const settings = ref<Settings>(window.Bridge.ipcRenderer.sendSync<unknown, Settings>(IpcChannel.GetSettings));

const save = async (): Promise<void> => saveSettings(ObjectUtility.clone<Settings>(settings.value));

const updateHideWindowOnBlur = (value: boolean) => {
    settings.value.generalSettings.hideWindowOnBlur = value;
    save();
};
</script>
