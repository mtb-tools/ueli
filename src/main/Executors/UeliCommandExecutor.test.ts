import { IpcMain } from "electron";
import { IpcChannel } from "../../common/IpcChannel";
import { SearchResultItem } from "../../common/SearchResult/SearchResultItem";
import { UeliCommandExecutor } from "./UeliCommandExecutor";

describe(UeliCommandExecutor, () => {
    it("should have the correct executor id", () => expect(UeliCommandExecutor.executorId).toBe("UeliCommandExecutor"));

    it("should correctly execute ueli command", async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const events: { eventName: string; args: any[] }[] = [];

        const ipcMain = <IpcMain>{
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            emit: (eventName: string, ...args: any[]) => {
                console.log(args);
                events.push({ eventName, args });
            },
        };

        const ueliCommandExecutor = new UeliCommandExecutor(ipcMain);

        await ueliCommandExecutor.execute(<SearchResultItem>{ executionArgument: "Des isch des leben" });
        await ueliCommandExecutor.execute(<SearchResultItem>{ executionArgument: "Des isch des leben" });
        await ueliCommandExecutor.execute(<SearchResultItem>{ executionArgument: "Des isch des leben" });

        expect(events.length).toBe(3);

        for (const event of events) {
            expect(event.eventName).toBe(IpcChannel.UeliCommandEvent);
            expect(event.args).toEqual([undefined, "Des isch des leben"]);
        }
    });
});
