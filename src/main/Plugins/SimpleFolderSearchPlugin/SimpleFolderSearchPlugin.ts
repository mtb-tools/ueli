import { ExecutionContext } from "../../ExecutionContext";
import { FileIconUtility } from "../../Utilities/FileIconUtility";
import { FileSystemUtility } from "../../Utilities/FileSystemUtility";
import { SearchPlugin } from "../SearchPlugin";
import { SimpleFolderSearchItem } from "./SimpleFolderSearchItem";
import { SimpleFolderSearchResultItem } from "./SimpleFolderSearchResultItem";

export class SimpleFolderSearchPlugin extends SearchPlugin<unknown> {
    public readonly pluginId = "SimpleFolderSearchPlugin";
    protected readonly defaultSettings = {};

    private items: SimpleFolderSearchItem[];

    public constructor(executionContext: ExecutionContext) {
        super(executionContext);
        this.items = [];
    }

    public clearCache(): Promise<void> {
        return Promise.resolve();
    }

    public async rescan(): Promise<void> {
        const filePaths = await FileSystemUtility.getFolderItems(this.executionContext.userHomePath);
        this.items = await Promise.all(filePaths.map((filePath) => SimpleFolderSearchPlugin.getIcon(filePath)));
    }

    public getAllSearchables(): SimpleFolderSearchResultItem[] {
        return this.items.map((file) => new SimpleFolderSearchResultItem(file.filePath, file.iconDataUrl));
    }

    private static async getIcon(filePath: string): Promise<SimpleFolderSearchItem> {
        return {
            filePath,
            iconDataUrl: await FileIconUtility.getIconDataUrlFromFilePath(filePath),
        };
    }
}
