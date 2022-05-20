import { Settings } from "../../common/Settings/Settings";
import { SettingsRepository } from "./SettingsRepository";
import { FileSystemUtility } from "./../Utilities/FileSystemUtility";

export class FileSettingsRepository implements SettingsRepository {
    public constructor(private readonly settingsFilePath: string) {}

    public readSettings(): Settings | undefined {
        const settingsFileExists = FileSystemUtility.existsSync(this.settingsFilePath);

        if (!settingsFileExists) {
            return undefined;
        }

        return FileSystemUtility.readJsonFileSync<Settings>(this.settingsFilePath);
    }

    public writeSettings(settings: Settings): Promise<void> {
        return FileSystemUtility.writeJsonFile<Settings>(settings, this.settingsFilePath);
    }
}
