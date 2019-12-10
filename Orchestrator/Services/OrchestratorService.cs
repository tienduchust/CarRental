using System;
using System.Collections.Generic;
using System.Linq;
using Model.Executor;
using Model.Orchestrator;
using Model.Queue;
using Orchestrator.Infrastructure;
using Orchestrator.Services.Queue;

namespace Orchestrator.Services
{
    public class OrchestratorService : ServiceBase
    {
        protected static List<ExecutorModel> ExecutorList { get; set; }

        public OrchestratorService()
        {
            ExecutorList = new List<ExecutorModel>
            {
                new ExecutorModel(1, "MAI HƯƠNG", "http://localhost:́́́́́́́́́́́́́9001")
            };
        }

        public virtual Result<List<QueueModel<BookingModel>>> EnqueueList(List<BookingModel> models)
        {
            List<QueueModel<BookingModel>> queueModels = new List<QueueModel<BookingModel>>();
            models.ForEach(model =>
            {
                var item = new QueueModel<BookingModel>
                {
                    Uuid = Guid.NewGuid(),
                    Data = model,
                    StatusId = (int) Constants.QueueStatus.Standby,
                    Status =    nameof(Constants.QueueStatus.Standby)

                };
                RequestQueue<BookingModel>.Queue.Enqueue(item);
                queueModels.Add(item);
            });
            
            return Ok(queueModels);
        }
        public virtual Result<List<QueueModel<BookingModel>>> BrowseQueue()
        {
            var result = RequestQueue<BookingModel>.Queue.ToList();
            return Ok(result);
        }
        public virtual Result<QueueModel<BookingModel>> PeekUp(int id)
        {
            var executor = ExecutorList.FirstOrDefault(x => x.Id == id);
            if (executor == null)
            {
                return Error<QueueModel<BookingModel>>(Constants.UnAuthorizedExecutor);
            }
            if (RequestQueue<BookingModel>.Queue.IsEmpty || RequestQueue<BookingModel>.Queue.Count == 0)
            {
                return Error<QueueModel<BookingModel>>(Constants.QueueEmpty);
            }

            bool isPicked = false;
            QueueModel<BookingModel> model;
            do
            {
                var isDequeue = RequestQueue<BookingModel>.Queue.TryDequeue(out model);
                if ((model.StatusId == (int)Constants.QueueStatus.Standby ||
                     model.StatusId == (int)Constants.QueueStatus.Error) && isDequeue)
                {
                    isPicked = true;
                    model.StatusId = (int)Constants.QueueStatus.Executing;
                    model.Status = nameof(Constants.QueueStatus.Executing);
                    model.Executor = executor;
                    RequestQueue<BookingModel>.Queue.Enqueue(model);
                }
            } while (!isPicked);

            if (!string.IsNullOrEmpty(model.Uuid.ToString()))
            {
                return Ok(model);
            }
            return Error<QueueModel<BookingModel>>(Constants.PeekUpQueueFailed);
        }
        public virtual Result<ExecutorModel> BrowseExecutor(int executorId)
        {
            var result = ExecutorList.FirstOrDefault(x => x.Id == executorId);
            return Ok(result);
        }
        public virtual Result<List<ExecutorModel>> BrowseExecutors(string term)
        {
            if (!string.IsNullOrEmpty(term))
            {
                term = term.ToLower();
                term = term.Trim();

                var result =
                    ExecutorList
                        .Where(x =>
                            x.Name.ToLower().Contains(term) || x.Ip.ToLower().Contains(term)
                        )
                        .ToList();

                return Ok(result);
            }

            return Ok(ExecutorList);
        }
    }
}