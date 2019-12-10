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
        public virtual Result<List<QueueModel<ToCyberModel>>> Add(List<ToCyberModel> models)
        {
            List<QueueModel<ToCyberModel>> queueModels = new List<QueueModel<ToCyberModel>>();
            models.ForEach(model =>
            {
                var item = new QueueModel<ToCyberModel>
                {
                    Uuid = Guid.NewGuid(),
                    Data = model,
                    StatusId = (int) Constants.QueueStatus.Standby,
                    Status =    nameof(Constants.QueueStatus.Standby)

                };
                RequestQueue<ToCyberModel>.Queue.Enqueue(item);
                queueModels.Add(item);
            });
            
            return Ok(queueModels);
        }
        public virtual Result<List<QueueModel<ToCyberModel>>> Browse()
        {
            var result = RequestQueue<ToCyberModel>.Queue.ToList();
            return Ok(result);
        }
    }
}