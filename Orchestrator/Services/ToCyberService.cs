using System;
using System.Collections.Generic;
using System.Linq;
using Orchestrator.Infrastructure;
using Orchestrator.Models;
using Orchestrator.Services.Queue;

namespace Orchestrator.Services
{
    public class ToCyberService : ServiceBase
    {
        public virtual Result<ToCyberModel> Add(ToCyberModel model)
        {
            RequestQueue<ToCyberModel>.Queue.Enqueue(new QueueModel<ToCyberModel>() { Uuid = new Guid(), Value = model });
            return Ok(model);
        }
    }
}