import { join } from "path";
import { Settings } from "../../common/Settings/Settings";
import { FileSettingsRepository } from "./FileSettingsRepository";
import { FileSystemUtility } from "./../Utilities/FileSystemUtility";

describe(FileSettingsRepository, () => {
    const temporaryFolder = join(__dirname, "temp");
    const settingsFilePath = join(temporaryFolder, "settings.json");

    beforeEach(async () => {
        await FileSystemUtility.createFolderIfDoesntExist(temporaryFolder);
        await FileSystemUtility.writeJsonFile({}, settingsFilePath);
    });

    afterEach(async () => await FileSystemUtility.deleteFolderRecursively(temporaryFolder));

    describe(FileSettingsRepository.prototype.readSettings, () => {
        it("should return undefined when settings file does not exist", () => {
            const actual = new FileSettingsRepository(join(temporaryFolder, "does-not-exist.json")).readSettings();
            expect(actual).toBe(undefined);
        });

        it("should return the content of the JSON file", () => {
            expect(new FileSettingsRepository(settingsFilePath).readSettings()).toEqual({});
        });
    });

    describe(FileSettingsRepository.prototype.writeSettings, () => {
        it("should write the settings to the specified JSON file", async () => {
            const fileSettingsRepository = new FileSettingsRepository(settingsFilePath);
            await fileSettingsRepository.writeSettings(<Settings>{ searchEngineSettings: { threshold: 0.23123 } });
            expect(fileSettingsRepository.readSettings()?.searchEngineSettings.threshold).toBe(0.23123);
        });
    });
});
