import { IpcChannel } from "../../../common/IpcChannel";
import { Settings } from "../../../common/Settings";
import { NotificationData } from "../../NotificationData";
import { NotificationType } from "../../NotificationType";
import { vueEventEmitter } from "../../VueEventEmitter";

const successfullySavedSettingsNotification = (): NotificationData => ({
    message: "Settings have been updated",
    autoHide: true,
    autoHideDuration: 2500,
    type: NotificationType.Success,
    icon: "check",
});

const failedToSaveSettingsNotification = (error: unknown): NotificationData => ({
    message: `Failed to save settings. Reason ${error}`,
    autoHide: false,
    type: NotificationType.Danger,
    icon: "exclamation-triangle-fill",
});

export const saveSettings = async (settings: Settings): Promise<void> => {
    try {
        window.Bridge.ipcRenderer.invoke<Settings, void>(IpcChannel.UpdateSettings, settings);
        vueEventEmitter.emit("Notification", successfullySavedSettingsNotification());
    } catch (error) {
        vueEventEmitter.emit("Notification", failedToSaveSettingsNotification(error));
    }
};
