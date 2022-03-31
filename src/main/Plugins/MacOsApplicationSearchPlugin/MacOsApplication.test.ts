import { LocalFilePathSearchResultItemIcon } from "../../../common/SearchResult/LocalFilePathSearchResultItemIcon";
import { SearchResultItem } from "../../../common/SearchResult/SearchResultItem";
import { FilePathExecutor } from "../../Executors/FilePathExecutor";
import { FilePathLocationOpener } from "../../LocationOpeners/FilePathLocationOpener";
import { MacOsApplication } from "./MacOsApplication";

describe(MacOsApplication, () => {
    describe(MacOsApplication.prototype.toSearchResultItem, () => {
        it("should convert correctly to a search result item", () => {
            const macOsApplication = new MacOsApplication("/Application/Spotify.app", "/path/to/icon.png");

            expect(macOsApplication.toSearchResultItem()).toEqual(<SearchResultItem>{
                description: "/Application/Spotify.app",
                executionArgument: "/Application/Spotify.app",
                executorId: FilePathExecutor.executorId,
                icon: new LocalFilePathSearchResultItemIcon("/path/to/icon.png"),
                locationOpenerId: FilePathLocationOpener.locationOpenerId,
                name: "Spotify",
                openLocationArgument: "/Application/Spotify.app",
            });
        });
    });
});
