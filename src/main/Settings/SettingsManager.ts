import { Logger } from "../../common/Logger/Logger";
import { ObjectUtility } from "../../common/ObjectUtility";
import { Settings } from "../../common/Settings/Settings";
import { SettingsFactory } from "./SettingsFactory";
import { SettingsRepository } from "./SettingsRepository";

export class SettingsManager {
    private userSettings?: Settings;

    public constructor(
        private readonly settingsRepository: SettingsRepository,
        private readonly defaultSettings: Settings,
        private readonly logger: Logger
    ) {
        this.userSettings = this.readSettingsFromFileSystem();
    }

    public getSettings(): Settings {
        return SettingsFactory.createFromUserSettings(
            ObjectUtility.toRecord<Settings>(this.userSettings ?? <Settings>{}),
            this.defaultSettings
        );
    }

    public updateSettings(updatedSettings: Settings): Promise<void> {
        this.userSettings = updatedSettings;
        return this.settingsRepository.writeSettings(updatedSettings);
    }

    private readSettingsFromFileSystem(): Settings | undefined {
        try {
            return this.settingsRepository.readSettings();
        } catch (error) {
            this.logger.error(`Failed to read user settings from settings file: Reason ${error}`);
            return undefined;
        }
    }
}
