import { Settings } from "../../common/Settings/Settings";
import { SettingsFactory } from "./SettingsFactory";

describe(SettingsFactory, () => {
    describe(SettingsFactory.createFromUserSettings, () => {
        it("should use the default settings if the user settings are empty", () => {
            const userSettings: Record<string, unknown> = {};
            const defaultSettings = <Settings>{
                generalSettings: { hideWindowOnBlur: false },
                searchEngineSettings: {
                    automaticRescanEnabled: true,
                    automaticRescanIntervalInSeconds: 301233,
                    threshold: 3,
                },
            };
            expect(SettingsFactory.createFromUserSettings(userSettings, defaultSettings)).toEqual(defaultSettings);
        });

        it("should merge the user settings with the default settings", () => {
            const userSettings: Record<string, unknown> = {
                generalSettings: { hideWindowOnBlur: true },
                searchEngineSettings: { threshold: 0 },
            };
            const defaultSettings = <Settings>{
                generalSettings: { hideWindowOnBlur: false },
                searchEngineSettings: {
                    automaticRescanEnabled: true,
                    automaticRescanIntervalInSeconds: 301233,
                    threshold: 3,
                },
            };
            expect(SettingsFactory.createFromUserSettings(userSettings, defaultSettings)).toEqual(<Settings>{
                generalSettings: { hideWindowOnBlur: true },
                searchEngineSettings: {
                    automaticRescanEnabled: true,
                    automaticRescanIntervalInSeconds: 301233,
                    threshold: 0,
                },
            });
        });
    });
});
