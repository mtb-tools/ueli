import { LocalFilePathSearchResultItemIcon } from "../../../common/SearchResult/LocalFilePathSearchResultItemIcon";
import { SearchResultItem } from "../../../common/SearchResult/SearchResultItem";
import { Searchable } from "../../Core/Searchable";
import { FilePathExecutor } from "../../Executors/FilePathExecutor";
import { FilePathLocationOpener } from "../../LocationOpeners/FilePathLocationOpener";

export class WindowsApplication implements Searchable {
    public constructor(
        private readonly name: string,
        private readonly filePath: string,
        private readonly iconFilePath: string
    ) {}

    public toSearchResultItem(): SearchResultItem {
        return {
            description: this.filePath,
            executionArgument: this.filePath,
            executorId: FilePathExecutor.executorId,
            icon: new LocalFilePathSearchResultItemIcon(this.iconFilePath),
            locationOpenerId: FilePathLocationOpener.locationOpenerId,
            name: this.name,
            openLocationArgument: this.filePath,
        };
    }
}
