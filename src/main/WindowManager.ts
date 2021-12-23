import { BrowserWindow } from "electron";
import { join } from "path";

export class WindowManager {
    private readonly preloadScriptFilePath: string;
    private readonly mainHtmlFilePath: string;
    private mainWindow: BrowserWindow | null = null;

    public constructor() {
        this.preloadScriptFilePath = join(__dirname, "Preload.js");
        this.mainHtmlFilePath = join(__dirname, "..", "views", "main.html");
    }

    public createMainWindow(): void {
        this.mainWindow = new BrowserWindow({
            frame: false,
            width: 800,
            height: 600,
            autoHideMenuBar: true,
            webPreferences: {
                preload: this.preloadScriptFilePath,
                spellcheck: false,
            },
        });

        this.mainWindow.loadFile(this.mainHtmlFilePath);
    }
}
