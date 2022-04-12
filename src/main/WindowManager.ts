import { BrowserWindow } from "electron";
import { BrowserWindowConstructorOptions } from "electron/main";
import { join } from "path";
import { IpcChannel } from "../common/IpcChannel";
import { ObjectUtility } from "../common/ObjectUtility";
import { SettingsManager } from "./SettingsManager";

export class WindowManager {
    private readonly mainHtmlFilePath = join(__dirname, "..", "views", "main.html");
    private readonly settingsHtmlFilePath = join(__dirname, "..", "views", "settings.html");
    private readonly preloadJsFilePath = join(__dirname, "Preload.js");
    private readonly browserWindowConstructorOptions: BrowserWindowConstructorOptions = {
        webPreferences: {
            preload: this.preloadJsFilePath,
            spellcheck: false,
        },
    };

    private mainWindow?: BrowserWindow;
    private settingsWindow?: BrowserWindow;

    public constructor(private readonly settingsManager: SettingsManager) {}

    public async createMainWindow(): Promise<void> {
        this.mainWindow = new BrowserWindow(
            this.mergeWindowConstructorOptionsWithDefault({
                frame: false,
                fullscreen: false,
                height: 500,
                show: false,
                transparent: true,
                width: 600,
            })
        );

        await this.mainWindow.loadFile(this.mainHtmlFilePath);
        this.mainWindow.on("blur", () => this.shouldHideMainWindowOnBlur() && this.hideMainWindow());
    }

    public async createSettingsWindow(): Promise<void> {
        this.settingsWindow = new BrowserWindow(this.mergeWindowConstructorOptionsWithDefault({}));
        this.settingsWindow.setMenuBarVisibility(false);
        await this.settingsWindow.loadFile(this.settingsHtmlFilePath);
    }

    public toggleMainWindow(): void {
        WindowManager.toggleWindow(this.mainWindow);
    }

    public async showMainWindow(): Promise<void> {
        WindowManager.showWindow(this.mainWindow);
    }

    public async showSettingsWindow(): Promise<void> {
        if (!this.settingsWindow || this.settingsWindow.isDestroyed()) {
            await this.createSettingsWindow();
        }

        WindowManager.showWindow(this.settingsWindow);
    }

    public hideMainWindow(): void {
        WindowManager.hideWindow(this.mainWindow);
    }

    private static toggleWindow(browserWindow?: BrowserWindow) {
        if (browserWindow && !browserWindow.isDestroyed()) {
            browserWindow.isVisible()
                ? WindowManager.hideWindow(browserWindow)
                : WindowManager.showWindow(browserWindow);
        }
    }

    private static showWindow(browserWindow?: BrowserWindow): void {
        if (browserWindow && !browserWindow.isDestroyed()) {
            if (browserWindow.isVisible()) {
                browserWindow.focus();
            } else {
                browserWindow.show();
            }

            WindowManager.sendMessageToWindow(browserWindow, IpcChannel.MainWindowShown);
        }
    }

    private static hideWindow(browserWindow?: BrowserWindow): void {
        if (browserWindow && !browserWindow.isDestroyed()) {
            browserWindow.hide();
        }
    }

    private static sendMessageToWindow<ArgumentType>(
        browserWindow: BrowserWindow,
        channel: IpcChannel,
        ...args: ArgumentType[]
    ): void {
        if (browserWindow && !browserWindow.isDestroyed()) {
            browserWindow.webContents.send(channel, args);
        }
    }

    private mergeWindowConstructorOptionsWithDefault(
        options: BrowserWindowConstructorOptions
    ): BrowserWindowConstructorOptions {
        return Object.assign(
            ObjectUtility.clone<BrowserWindowConstructorOptions>(this.browserWindowConstructorOptions),
            ObjectUtility.clone<BrowserWindowConstructorOptions>(options)
        );
    }

    private shouldHideMainWindowOnBlur(): boolean {
        return this.settingsManager.getSettings().generalSettings.hideWindowOnBlur;
    }
}
