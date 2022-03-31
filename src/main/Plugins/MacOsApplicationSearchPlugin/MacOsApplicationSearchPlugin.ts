import { createHash } from "crypto";
import { join } from "path";
import { ExecutionContext } from "../../ExecutionContext";
import { SearchPlugin } from "../SearchPlugin";
import { MacOsApplication } from "./MacOsApplication";
import { app } from "electron";
import { FileSystemUtility } from "../../Utilities/FileSystemUtility";

export class MacOsApplicationSearchPlugin extends SearchPlugin<Record<string, unknown>> {
    public readonly pluginId = "MacOsApplicationSearchPlugin";
    protected readonly defaultSettings: Record<string, unknown>;
    private applications: MacOsApplication[];

    public constructor(
        executionContext: ExecutionContext,
        private readonly macOsApplicationFileRetriever: () => Promise<string[]>
    ) {
        super(executionContext);

        this.defaultSettings = {};
        this.applications = [];
    }

    public getAllSearchables(): MacOsApplication[] {
        return this.applications;
    }

    public async clearCache(): Promise<void> {
        return;
    }

    public async rescan(): Promise<void> {
        const filePaths = await this.macOsApplicationFileRetriever();
        await this.generateMacAppIcons(filePaths);

        this.applications = filePaths.map(
            (filePath) => new MacOsApplication(filePath, this.getApplicationIconFilePath(filePath))
        );
    }

    private async generateMacAppIcons(filePaths: string[]): Promise<void> {
        await Promise.all(filePaths.map((filePath) => this.generateMacAppIcon(filePath)));
    }

    private async generateMacAppIcon(filePath: string): Promise<void> {
        const outPngFilePath = this.getApplicationIconFilePath(filePath);
        const fileExists = await FileSystemUtility.pathExists(outPngFilePath);

        if (fileExists) {
            return;
        }

        const image = await app.getFileIcon(filePath);
        await FileSystemUtility.writePng(image.toPNG(), outPngFilePath);
    }

    private getApplicationIconFilePath(applicationFilePath: string): string {
        const hash = createHash("sha256").update(`${applicationFilePath}`).digest("hex");
        return `${join(this.getTemporaryFolderPath(), hash)}.png`;
    }
}
