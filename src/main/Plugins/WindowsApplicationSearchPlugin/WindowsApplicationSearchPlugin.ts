import { WindowsApplication } from "./WindowsApplication";
import { WindowsApplicationSearchSettings } from "./WindowsApplicationSearchSettings";
import { WindowsApplicationRetrieverResult } from "./WindowsApplicationRetrieverResult";
import { SearchPlugin } from "../SearchPlugin";
import { ApplicationRuntimeInformation } from "../../ApplicationRuntimeInformation";
import { join } from "path";
import { extractShortcutPowershellScript, getWindowsAppsPowershellScript } from "./PowershellScripts";

export class WindowsApplicationSearchPlugin extends SearchPlugin<WindowsApplicationSearchSettings> {
    private static readonly extractShortcutPowershellScript = extractShortcutPowershellScript;
    private static readonly getWindowsAppsPowershellScript = getWindowsAppsPowershellScript;

    public readonly pluginId = "WindowsApplicationSearchPlugin";
    protected readonly defaultSettings: WindowsApplicationSearchSettings;
    private applications: WindowsApplication[];

    public constructor(
        applicationRuntimeInformation: ApplicationRuntimeInformation,
        private readonly executePowershellScript: (powershellScript: string) => Promise<string>
    ) {
        super(applicationRuntimeInformation);

        this.defaultSettings = {
            folderPaths: [
                "C:\\ProgramData\\Microsoft\\Windows\\Start Menu",
                join(
                    applicationRuntimeInformation.userHomePath,
                    "AppData",
                    "Roaming",
                    "Microsoft",
                    "Windows",
                    "Start Menu"
                ),
            ],
            fileExtensions: ["lnk"],
        };

        this.applications = [];
    }

    public getAllSearchables(): WindowsApplication[] {
        return this.applications;
    }

    public async rescan(): Promise<void> {
        const settings = await this.getSettings();
        const stdout = await this.executePowershellScript(this.getPowershellScript(settings));
        const windowsApplicationRetrieverResults = <WindowsApplicationRetrieverResult[]>JSON.parse(stdout);

        this.applications = windowsApplicationRetrieverResults.map((app) =>
            WindowsApplication.fromWindowsAppRetrieverResult(app)
        );
    }

    public async clearCache(): Promise<void> {
        try {
            await this.executePowershellScript(`Remove-Item '${this.getTemporaryFolderPath()}\\*.png'`);
        } catch (error) {
            throw new Error(`WindowsApplicationSearchPlugin failed to clear cache. Reason: ${error}`);
        }
    }

    private getPowershellScript(settings: WindowsApplicationSearchSettings): string {
        const folderPaths = WindowsApplicationSearchPlugin.getFolderPathFilter(settings.folderPaths);
        const fileExtensions = WindowsApplicationSearchPlugin.getFileExtensionFilter(settings.fileExtensions);
        const tempFolderPath = this.getTemporaryFolderPath();

        return `
            ${WindowsApplicationSearchPlugin.extractShortcutPowershellScript}
            ${WindowsApplicationSearchPlugin.getWindowsAppsPowershellScript}
            Get-WindowsApps
                -FolderPaths ${folderPaths}
                -FileExtensions ${fileExtensions}
                -AppIconFolder ${tempFolderPath}
        `;
    }

    private static getFolderPathFilter(folderPaths: string[]): string {
        return folderPaths.map((folderPath) => `'${folderPath}'`).join(",");
    }

    private static getFileExtensionFilter(fileExtensions: string[]): string {
        return fileExtensions.map((fileExtension) => `'*.${fileExtension}'`).join(",");
    }
}
