import { IpcChannel } from "../common/IpcChannel";
import { Settings } from "../common/Settings/Settings";

export const getSettings = () => window.Bridge.ipcRenderer.sendSync<void, Settings>(IpcChannel.GetSettings);

export const saveSettings = (updatedSettings: Settings) =>
    window.Bridge.ipcRenderer.invoke<Settings, void>(IpcChannel.UpdateSettings, updatedSettings);
