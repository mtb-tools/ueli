import { Settings } from "../common/Settings";

export interface SettingsRepository {
    readSettings(): Settings | undefined;
    writeSettings(settings: Settings): Promise<void>;
}
