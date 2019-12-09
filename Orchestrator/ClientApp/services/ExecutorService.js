import ServiceBase from "@Services/ServiceBase";

export default class ExecutorService extends ServiceBase {
    static async search(term) {
        if (term == null) {
            term = "";
        }
        let result = await this.requestJson({
            url: `/api/Executor/Search?term=${term}`,
            method: "GET"
        });
        return result;
    }
   
}