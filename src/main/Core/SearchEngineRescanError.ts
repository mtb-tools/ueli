export class SearchEngineRescanError extends Error {
    public constructor(reason: unknown) {
        super(`Failed to rescan all plugins. Reason: ${reason}`);
    }
}
