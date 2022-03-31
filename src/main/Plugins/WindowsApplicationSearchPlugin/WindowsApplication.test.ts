import { LocalFilePathSearchResultItemIcon } from "../../../common/SearchResult/LocalFilePathSearchResultItemIcon";
import { SearchResultItem } from "../../../common/SearchResult/SearchResultItem";
import { FilePathExecutor } from "../../Executors/FilePathExecutor";
import { FilePathLocationOpener } from "../../LocationOpeners/FilePathLocationOpener";
import { WindowsApplication } from "./WindowsApplication";

describe(WindowsApplication, () => {
    describe(WindowsApplication.prototype.toSearchResultItem, () => {
        it("should correctly serialize to a search result item", () => {
            const windowsApplication = new WindowsApplication(
                "Spotify",
                "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Spotify.lnk",
                "C:\\Path\\To\\Icon.png"
            );

            expect(windowsApplication.toSearchResultItem()).toEqual(<SearchResultItem>{
                description: "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Spotify.lnk",
                executionArgument: "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Spotify.lnk",
                executorId: FilePathExecutor.executorId,
                icon: new LocalFilePathSearchResultItemIcon("C:\\Path\\To\\Icon.png"),
                locationOpenerId: FilePathLocationOpener.locationOpenerId,
                name: "Spotify",
                openLocationArgument: "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Spotify.lnk",
            });
        });
    });
});
