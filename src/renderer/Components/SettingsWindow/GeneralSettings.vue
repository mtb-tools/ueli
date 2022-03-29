<template>
    <USettingList title="General settings">
        <template v-slot:settings>
            <USetting>
                <template v-slot:label>Hide window on blur</template>
                <template v-slot:body>
                    <UToggle
                        :toggled="settings.generalSettings.hideWindowOnBlur"
                        @toggle="hideWindowOnBlurOptionChanged"
                    />
                </template>
            </USetting>
        </template>
    </USettingList>
</template>

<script lang="ts" setup>
import { USettingList, USetting, UToggle } from "ueli-designsystem";
import { Settings } from "../../../common/Settings";
import { IpcChannel } from "../../../common/IpcChannel";

const hideWindowOnBlurOptionChanged = (value: boolean) => console.log(value);
const settings = window.Bridge.ipcRenderer.sendSync<unknown, Settings>(IpcChannel.GetSettings);
</script>
