namespace Orchestrator.Models
{
    public class ExecutorModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Ip { get; set; }

        public ExecutorModel(int id, string name, string ip)
        {
            Id = id;
            Name = name;
            Ip = ip;
        }

        public ExecutorModel()
        {
        }
    }
}