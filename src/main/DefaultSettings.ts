import { Settings } from "../common/Settings";

export const defaultSettings: Settings = {
    generalSettings: {
        hideWindowOnBlur: true,
    },
    searchEngineSettings: {
        threshold: 0.4,
        automaticRescanEnabled: true,
        automaticRescanIntervalInSeconds: 300,
    },
    appearanceSettings: {
        colorTheme: "UeliDark",
    },
};
