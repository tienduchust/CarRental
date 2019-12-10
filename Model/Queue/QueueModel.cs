using System;
using System.Collections.Generic;
using System.Text;
using Model.Executor;

namespace Model.Queue
{
    public class QueueModel<T>
    {
        public Guid Uuid { get; set; }
        public T Data { get; set; }
        public int StatusId { get; set; }
        public string Status { get; set; }
        public ExecutorModel Executor { get; set; }
    }
}
