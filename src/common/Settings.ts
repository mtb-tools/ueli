import { AppearanceSettings } from "./AppearanceSettings";
import { GeneralSettings } from "./GeneralSettings";
import { SearchEngineSettings } from "./SearchEngineSettings";

export interface Settings {
    generalSettings: GeneralSettings;
    searchEngineSettings: SearchEngineSettings;
    appearanceSettings: AppearanceSettings;
}
