import { Settings } from "../../common/Settings/Settings";

export interface SettingsRepository {
    readSettings(): Settings | undefined;
    writeSettings(settings: Settings): Promise<void>;
}
