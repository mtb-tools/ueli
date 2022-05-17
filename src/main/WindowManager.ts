import { BrowserWindow } from "electron";
import { BrowserWindowConstructorOptions } from "electron/main";
import { join } from "path";
import { IpcChannel } from "../common/IpcChannel";
import { ObjectUtility } from "../common/ObjectUtility";
import { SettingsManager } from "./SettingsManager";

export class WindowManager {
    private static readonly mainHtmlFilePath = join(__dirname, "..", "views", "main.html");
    private static readonly settingsHtmlFilePath = join(__dirname, "..", "views", "settings.html");
    private static readonly preloadJsFilePath = join(__dirname, "Preload.js");

    private static readonly browserWindowConstructorOptions: BrowserWindowConstructorOptions = {
        webPreferences: {
            preload: WindowManager.preloadJsFilePath,
            spellcheck: false,
        },
    };

    private static readonly mergeWindowConstructorOptionsWithDefault = (options: BrowserWindowConstructorOptions) =>
        Object.assign(
            ObjectUtility.clone<BrowserWindowConstructorOptions>(WindowManager.browserWindowConstructorOptions),
            ObjectUtility.clone<BrowserWindowConstructorOptions>(options)
        );

    private mainWindow?: BrowserWindow;
    private settingsWindow?: BrowserWindow;

    public constructor(private readonly settingsManager: SettingsManager) {}

    public async createMainWindow(): Promise<void> {
        this.mainWindow = new BrowserWindow(
            WindowManager.mergeWindowConstructorOptionsWithDefault({
                frame: false,
                fullscreen: false,
                height: 500,
                show: false,
                transparent: true,
                width: 600,
            })
        );

        await this.mainWindow.loadFile(WindowManager.mainHtmlFilePath);
        this.mainWindow.on("blur", () => this.shouldHideMainWindowOnBlur() && this.hideMainWindow());
    }

    public async createSettingsWindow(): Promise<void> {
        this.settingsWindow = new BrowserWindow(WindowManager.mergeWindowConstructorOptionsWithDefault({}));
        this.settingsWindow.setMenuBarVisibility(false);
        await this.settingsWindow.loadFile(WindowManager.settingsHtmlFilePath);

        this.settingsWindow.webContents.on("did-fail-load", (event) => {
            event.preventDefault();
            this.settingsWindow?.loadFile(WindowManager.settingsHtmlFilePath);
        });
    }

    public toggleMainWindow(): void {
        WindowManager.toggleWindow(this.mainWindow);
    }

    public showMainWindow(): void {
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

    public sendMessageToAllWindows<T>(channel: IpcChannel, ...args: T[]): void {
        if (this.mainWindow && !this.mainWindow.isDestroyed()) {
            WindowManager.sendMessageToWindow(this.mainWindow, channel, ...args);
        }

        if (this.settingsWindow && !this.settingsWindow.isDestroyed()) {
            WindowManager.sendMessageToWindow<T>(this.settingsWindow, channel, ...args);
        }
    }

    private static toggleWindow(browserWindow?: BrowserWindow): void {
        if (browserWindow && !browserWindow.isDestroyed()) {
            browserWindow.isVisible()
                ? WindowManager.hideWindow(browserWindow)
                : WindowManager.showWindow(browserWindow);
        }
    }

    private static showWindow(browserWindow?: BrowserWindow): void {
        if (browserWindow && !browserWindow.isDestroyed()) {
            browserWindow.isVisible() ? browserWindow.focus() : browserWindow.show();
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
            browserWindow.webContents.send(channel, ...args);
        }
    }

    private shouldHideMainWindowOnBlur(): boolean {
        return this.settingsManager.getSettings().generalSettings.hideWindowOnBlur;
    }
}
