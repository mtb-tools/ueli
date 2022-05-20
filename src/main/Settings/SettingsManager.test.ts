import { ConsoleLogger } from "../../common/Logger/ConsoleLogger";
import { Settings } from "../../common/Settings/Settings";
import { DummySettingsRepository } from "./DummySettingsRepository";
import { SettingsManager } from "./SettingsManager";

describe(SettingsManager, () => {
    const logger = new ConsoleLogger();
    const defaultSettings = <Settings>{
        generalSettings: {
            hideWindowOnBlur: true,
        },
        searchEngineSettings: {
            automaticRescanEnabled: true,
            automaticRescanIntervalInSeconds: 300,
            threshold: 0.5,
        },
    };

    describe(SettingsManager.prototype.getSettings, () => {
        it("should return default settings when repository returns `undefined`", () => {
            const settingsRepository = new DummySettingsRepository(undefined);
            const settingsManager = new SettingsManager(settingsRepository, defaultSettings, logger);
            expect(settingsManager.getSettings()).toEqual(defaultSettings);
        });

        it("should merge user settings with default when repository returns some settings", () => {
            const userSettings = <Settings>{ generalSettings: { hideWindowOnBlur: false } };
            const settingsRepository = new DummySettingsRepository(userSettings);
            const settingsManager = new SettingsManager(settingsRepository, defaultSettings, logger);
            expect(settingsManager.getSettings()).toEqual(<Settings>{
                generalSettings: {
                    hideWindowOnBlur: false,
                },
                searchEngineSettings: {
                    automaticRescanEnabled: true,
                    automaticRescanIntervalInSeconds: 300,
                    threshold: 0.5,
                },
            });
        });
    });

    describe(SettingsManager.prototype.updateSettings, () => {
        it("should update settings on the repository", () => {
            const settingsRepository = new DummySettingsRepository(undefined);
            const settingsManager = new SettingsManager(settingsRepository, defaultSettings, logger);
            const updatedSettings = <Settings>{ generalSettings: { hideWindowOnBlur: false } };
            settingsManager.updateSettings(updatedSettings);
            expect(settingsRepository.settings).toEqual(updatedSettings);
        });
    });
});
