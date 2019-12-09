import ServiceBase from "@Services/ServiceBase";

export default class ToCyberService extends ServiceBase {
    static async add(model) {
        let result = await this.requestJson({
            url: `/api/ToCyber/Add/${model.code}`,
            method: "POST",
            data: model
        });
        return result;
    }
}