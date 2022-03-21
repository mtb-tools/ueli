import { ExecutionContext } from "./ExecutionContext";

export class DummyExecutionContext {
    public static empty({
        executablePath = "",
        temporaryDirectoryPath = "",
        userDataPath = "",
        userHomePath = "",
    } = {}): ExecutionContext {
        return {
            executablePath,
            temporaryDirectoryPath,
            userDataPath,
            userHomePath,
        };
    }
}
