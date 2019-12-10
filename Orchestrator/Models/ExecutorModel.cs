namespace Orchestrator.Models
{
    public class ExecutorModel
    {
        public int Id { get; }
        public string Name { get; }
        public string Ip { get; }

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