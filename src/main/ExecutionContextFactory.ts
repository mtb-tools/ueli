import { App } from "electron";
import { OperatingSystem } from "../common/OperatingSystem/OperatingSystem";
import { ExecutionContext } from "./ExecutionContext";

export class ExecutionContextFactory {
    public static fromElectronApp(operatingSystem: OperatingSystem, electronApp: App): ExecutionContext {
        return new ExecutionContext(
            operatingSystem,
            electronApp.getPath("exe"),
            electronApp.getPath("temp"),
            electronApp.getPath("userData"),
            electronApp.getPath("home")
        );
    }

    public static fromDummy({
        operatingSystem = OperatingSystem.Windows,
        executablePath = "",
        temporaryDirectoryPath = "",
        userDataPath = "",
        userHomePath = "",
    } = {}): ExecutionContext {
        return new ExecutionContext(
            operatingSystem,
            executablePath,
            temporaryDirectoryPath,
            userDataPath,
            userHomePath
        );
    }
}
