import { Settings } from "../common/Settings";
import { SettingsRepository } from "./SettingsRepository";

export class DummySettingsRepository implements SettingsRepository {
    public constructor(public settings: Settings | undefined) {}

    public readSettings(): Settings | undefined {
        return this.settings;
    }

    public async writeSettings(settings: Settings): Promise<void> {
        this.settings = settings;
    }
}
