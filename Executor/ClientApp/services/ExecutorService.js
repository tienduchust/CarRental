import ServiceBase from "@Services/ServiceBase";

export default class ExecutorService extends ServiceBase {
    static async peekUp() {
        let result = await this.requestJson({
            url: "/api/Executor/PeekUp",
            method: "GET"
        });
        return result;
    }
    static async finishUp(model) {
        let result = await this.requestJson({
            url: "/api/Executor/FinishUp",
            method: "POST",
            data: model
        });
        return result;
    }
}