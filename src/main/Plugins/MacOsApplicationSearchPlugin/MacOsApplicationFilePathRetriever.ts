import { normalize } from "path";
import { CommandlineUtility } from "../../Utilities/CommandlineUtility";

export class MacOsApplicationFilePathRetriever {
    public static async retrieveAllApplicationFilePaths(): Promise<string[]> {
        const output = await CommandlineUtility.executeCommandWithOutput("mdfind kind:apps");

        return output
            .split("\n")
            .map((filePath) => normalize(filePath).trim())
            .filter((filePath) => [".", ".."].indexOf(filePath) === -1);
    }
}
