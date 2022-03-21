import { ExecutionContext } from "../ExecutionContext";
import { SearchPlugin } from "../Plugins/SearchPlugin";
import { SimpleFolderSearchPlugin } from "../Plugins/SimpleFolderSearchPlugin/SimpleFolderSearchPlugin";
import { UeliCommandsPlugin } from "../Plugins/UeliCommandsPlugin/UeliCommandsPlugin";

export abstract class PluginRepository {
    protected abstract getOperatingSystemSpecificPlugins(): SearchPlugin<unknown>[];

    protected constructor(protected readonly executionContext: ExecutionContext) {}

    protected getCommonPlugins(): SearchPlugin<unknown>[] {
        return [new SimpleFolderSearchPlugin(this.executionContext), new UeliCommandsPlugin(this.executionContext)];
    }

    public getAllPlugins(): SearchPlugin<unknown>[] {
        return this.getCommonPlugins().concat(this.getOperatingSystemSpecificPlugins());
    }
}
