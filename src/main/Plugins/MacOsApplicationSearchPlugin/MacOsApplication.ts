import { basename, extname } from "path";
import { LocalFilePathSearchResultItemIcon } from "../../../common/SearchResult/LocalFilePathSearchResultItemIcon";
import { SearchResultItem } from "../../../common/SearchResult/SearchResultItem";
import { Searchable } from "../../Core/Searchable";
import { FilePathExecutor } from "../../Executors/FilePathExecutor";
import { FilePathLocationOpener } from "../../LocationOpeners/FilePathLocationOpener";

export class MacOsApplication implements Searchable {
    public constructor(private readonly filePath: string, private readonly iconFilePath: string) {}

    public toSearchResultItem(): SearchResultItem {
        return {
            description: this.filePath,
            executionArgument: this.filePath,
            executorId: FilePathExecutor.executorId,
            icon: new LocalFilePathSearchResultItemIcon(this.iconFilePath),
            locationOpenerId: FilePathLocationOpener.locationOpenerId,
            name: basename(this.filePath, extname(this.filePath)),
            openLocationArgument: this.filePath,
        };
    }
}
