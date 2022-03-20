import { ExecutionService } from "./ExecutionService";
import { Executor } from "../Executors/Executor";
import { ExecutorDummy } from "../Executors/ExecutorDummy";
import { SearchResultItemDummy } from "../../common/SearchResult/SearchResultItemDummy";

describe(ExecutionService, () => {
    describe(Executor.prototype.execute, () => {
        it("should succeed if the corresponding executor resolves", async () => {
            const executorDummy = new ExecutorDummy();
            const executionService = new ExecutionService([executorDummy]);
            await executionService.execute(SearchResultItemDummy.withExecutorId(executorDummy.executorId));
        });

        it("should fail if the corresponding executor rejects", async () => {
            const executorDummy = new ExecutorDummy(undefined, false);
            const executionService = new ExecutionService([executorDummy]);

            try {
                await executionService.execute(SearchResultItemDummy.withExecutorId(executorDummy.executorId));
            } catch (error) {
                expect(error).toBe("Failed");
            }
        });

        it("should fail if there is no corresponding executor found", async () => {
            const executionService = new ExecutionService([new ExecutorDummy()]);

            try {
                await executionService.execute(SearchResultItemDummy.withExecutorId("some random executor id"));
            } catch (error) {
                expect(error).toBe(
                    `Can't execute "${
                        SearchResultItemDummy.withExecutorId("some random executor id").executionArgument
                    }". Reason: no executor found.`
                );
            }
        });
    });
});
