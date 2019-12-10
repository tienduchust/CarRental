import ServiceBase from "./ServiceBase";

export default class OrchestratorService extends ServiceBase {
    static async EnqueueList(model) {
        let result = await this.requestJson({
            url: `/api/Orchestrator/EnqueueList`,
            method: "POST",
            data: model
        });
        return result;
    }
    static async browseQueue() {
        let result = await this.requestJson({
            url: `/api/Orchestrator/BrowseQueue`,
            method: "GET"
        });
        return result;
    }
    static async browseExecutors(term) {
        if (term == null) {
            term = "";
        }
        let result = await this.requestJson({
            url: `/api/Orchestrator/BrowseExecutors?term=${term}`,
            method: "GET"
        });
        return result;
    }
    static async browseExecutor(executorId) {
        let result = await this.requestJson({
            url: `/api/Orchestrator/BrowseExecutor/${executorId}`,
            method: "GET"
        });
        return result;
    }
}