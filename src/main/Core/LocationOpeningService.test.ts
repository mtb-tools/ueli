import { SearchResultItemDummy } from "../../common/SearchResult/SearchResultItemDummy";
import { LocationOpenerDummy } from "../LocationOpeners/LocationOpenerDummy";
import { LocationOpeningService } from "./LocationOpeningService";

describe(LocationOpeningService, () => {
    describe(LocationOpeningService.prototype.openLocation, () => {
        it("should succeed if there is an corresponding location opener", async () => {
            const locationOpenerDummy = new LocationOpenerDummy();
            const locationOpeningService = new LocationOpeningService([locationOpenerDummy]);
            await locationOpeningService.openLocation(
                SearchResultItemDummy.withLocationOpenerId(locationOpenerDummy.locationOpenerId)
            );
        });

        it("should fail if the corresponding location opener fails", async () => {
            const locationOpenerDummy = new LocationOpenerDummy("LocationOpenerDummy", false);
            const locationOpeningService = new LocationOpeningService([locationOpenerDummy]);
            try {
                await locationOpeningService.openLocation(
                    SearchResultItemDummy.withLocationOpenerId(locationOpenerDummy.locationOpenerId)
                );
            } catch (error) {
                expect(error).toBe("Failed");
            }
        });

        it("should fail if there is no corresponding location opener", async () => {
            const locationOpeningService = new LocationOpeningService([new LocationOpenerDummy()]);
            try {
                await locationOpeningService.openLocation(
                    SearchResultItemDummy.withLocationOpenerId("Some other opener id")
                );
            } catch (error) {
                expect(error).toBe(
                    `Unable to open location for "Some other opener id". Reason: no location opener found.`
                );
            }
        });
    });
});
