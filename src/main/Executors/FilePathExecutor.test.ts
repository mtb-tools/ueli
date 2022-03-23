import { FilePathExecutor } from "./FilePathExecutor";
import { SearchResultItemDummy } from "../../common/SearchResult/SearchResultItemDummy";

describe(FilePathExecutor, () => {
    const successfulFilePathExecutor = new FilePathExecutor(() => Promise.resolve());
    const failingFilePathExecutor = new FilePathExecutor(() => Promise.reject("Failed"));

    it("should have the correct executor id", () => expect(FilePathExecutor.executorId).toBe("FilePathExecutor"));

    it("should succeed if the file path opener resolves", async () => {
        await successfulFilePathExecutor.execute(SearchResultItemDummy.empty());
    });

    it("should fail if the file path opener rejects", async () => {
        try {
            await failingFilePathExecutor.execute(SearchResultItemDummy.empty());
        } catch (error) {
            expect(error).toBe("Failed");
        }
    });
});
