namespace Orchestrator.Models
{
    public class ToCyberModel
    {
        public string Code { get; set; }
        public string CreatedAt { get; set; }
        public string Json { get; set; }

        public ToCyberModel(string code, string createdAt, string json)
        {
            Code = code;
            CreatedAt = createdAt;
            Json = json;
        }

        public ToCyberModel()
        {
        }
    }
}