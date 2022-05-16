import { App } from "electron";
import { OperatingSystem } from "../common/OperatingSystem/OperatingSystem";
import { ExecutionContextFactory } from "./ExecutionContextFactory";

describe(ExecutionContextFactory, () => {
    const operatingSystem = OperatingSystem.Windows;
    const electronApp = <App>{ getPath: (name) => name };

    describe(ExecutionContextFactory.fromElectronApp, () => {
        it("should set the correct public properties", () => {
            const executionContext = ExecutionContextFactory.fromElectronApp(operatingSystem, electronApp);
            expect(executionContext.executablePath).toBe("exe");
            expect(executionContext.temporaryDirectoryPath).toBe("temp");
            expect(executionContext.userDataPath).toBe("userData");
            expect(executionContext.userHomePath).toBe("home");
        });
    });

    describe(ExecutionContextFactory.fromDummy, () => {
        it("should set the correct public properties", () => {
            const executionContext = ExecutionContextFactory.fromDummy({
                operatingSystem: OperatingSystem.macOS,
                executablePath: "exe",
                temporaryDirectoryPath: "temp",
                userDataPath: "userData",
                userHomePath: "home",
            });

            expect(executionContext.operatingSystem).toBe(OperatingSystem.macOS);
            expect(executionContext.executablePath).toBe("exe");
            expect(executionContext.temporaryDirectoryPath).toBe("temp");
            expect(executionContext.userDataPath).toBe("userData");
            expect(executionContext.userHomePath).toBe("home");
        });
    });
});
