import ServiceBase from "@Services/ServiceBase";

export default class ToCyberService extends ServiceBase {
    static async add(model) {
        let result = await this.requestJson({
            url: `/api/ToCyber/Add`,
            method: "POST",
            data: model
        });
        return result;
    }
    static async browse() {
        let result = await this.requestJson({
            url: `/api/ToCyber/Browse`,
            method: "GET"
        });
        return result;
    }
}