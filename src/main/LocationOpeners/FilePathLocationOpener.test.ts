import { FilePathLocationOpener } from "./FilePathLocationOpener";
import { SearchResultItemDummy } from "../../common/SearchResult/SearchResultItemDummy";

describe(FilePathLocationOpener, () => {
    it("should succeed if the file path location opener resolves", async () => {
        const filePathLocationOpener = new FilePathLocationOpener(() => Promise.resolve());
        await filePathLocationOpener.openLocation(SearchResultItemDummy.empty());
    });

    it("should fail if the file path location opener rejects", async () => {
        const filePathLocationOpener = new FilePathLocationOpener(() => Promise.reject("Failed"));
        try {
            await filePathLocationOpener.openLocation(SearchResultItemDummy.empty());
        } catch (error) {
            expect(error).toBe("Failed");
        }
    });
});
