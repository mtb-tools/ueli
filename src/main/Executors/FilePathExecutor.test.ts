import { FilePathExecutor } from "./FilePathExecutor";
import { SearchResultItemDummy } from "../../common/SearchResult/SearchResultItemDummy";

describe(FilePathExecutor, () => {
    it("should succeed if the file path opener resolves", async () => {
        const filePathExecutor = new FilePathExecutor(() => Promise.resolve());
        await filePathExecutor.execute(SearchResultItemDummy.empty());
    });

    it("should fail if the file path opener rejects", async () => {
        const filePathExecutor = new FilePathExecutor(() => Promise.reject("Failed"));
        try {
            await filePathExecutor.execute(SearchResultItemDummy.empty());
        } catch (error) {
            expect(error).toBe("Failed");
        }
    });
});
