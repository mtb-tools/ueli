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

<script lang="ts">
import { defineComponent } from "vue";
import { USettingList, USetting, UToggle } from "ueli-designsystem";
import { Settings } from "../../../common/Settings";
import { IpcChannel } from "../../../common/IpcChannel";

interface Data {
    settings: Settings;
    hideWindowOnBlurOptionChanged: (value: boolean) => void;
}

export default defineComponent({
    components: {
        USetting,
        USettingList,
        UToggle,
    },

    setup(): Data {
        return {
            hideWindowOnBlurOptionChanged: (value: boolean) => console.log(value),
            settings: window.Bridge.ipcRenderer.sendSync<unknown, Settings>(IpcChannel.GetSettings),
        };
    },
});
</script>
