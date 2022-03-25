export class ExecutionContext {
    public constructor(
        public readonly executablePath: string,
        public readonly temporaryDirectoryPath: string,
        public readonly userDataPath: string,
        public readonly userHomePath: string
    ) {}
}
