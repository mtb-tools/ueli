import { OperatingSystem } from "../common/OperatingSystem/OperatingSystem";

export class ExecutionContext {
    public constructor(
        public readonly operatingSystem: OperatingSystem,
        public readonly executablePath: string,
        public readonly temporaryDirectoryPath: string,
        public readonly userDataPath: string,
        public readonly userHomePath: string
    ) {}
}
