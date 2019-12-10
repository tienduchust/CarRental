using System;
using System.Collections.Generic;
using System.Linq;
using Orchestrator.Infrastructure;
using Orchestrator.Models;
using Orchestrator.Services.Queue;

namespace Orchestrator.Services
{
    public class ExecutorService : ServiceBase
    {
        static ExecutorService()
        {
            ExecutorList = new List<ExecutorModel>
            {
                new ExecutorModel(1, "MAI HƯƠNG", "http://localhost:́́́́́́́́́́́́́9001")
            };
        }

        protected static List<ExecutorModel> ExecutorList { get; }

        public virtual Result<List<ExecutorModel>> Search(string term = null)
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

        public virtual Result<QueueModel<ToCyberModel>> PeekUp(int id)
        {
            var executor = ExecutorList.FirstOrDefault(x => x.Id == id);
            if (executor == null)
            {
                return Error<QueueModel<ToCyberModel>>(Constants.UnAuthorizedExecutor);
            }
            if (RequestQueue<ToCyberModel>.Queue.IsEmpty || RequestQueue<ToCyberModel>.Queue.Count == 0)
            {
                return Error<QueueModel<ToCyberModel>>(Constants.QueueEmpty);
            }

            bool isPicked = false;
            QueueModel<ToCyberModel> model;
            do
            {
                var isDequeue = RequestQueue<ToCyberModel>.Queue.TryDequeue(out model);
                if ((model.StatusId == (int) Constants.QueueStatus.Standby ||
                    model.StatusId == (int) Constants.QueueStatus.Error) && isDequeue)
                {
                    isPicked = true;
                    model.StatusId = (int) Constants.QueueStatus.Executing;
                    model.Status = nameof(Constants.QueueStatus.Executing);
                    model.Executor = executor;
                    RequestQueue<ToCyberModel>.Queue.Enqueue(model);
                }
            } while (!isPicked);

            if (!string.IsNullOrEmpty(model.Uuid.ToString()))
            {
                return Ok(model);
            }
            return Error<QueueModel<ToCyberModel>>(Constants.PeekUpQueueFailed);
        }
//        public virtual Result<List<ExecutorModel>> FinishUp(Guid queueUuid)
//        {
//            if (!string.IsNullOrEmpty(term))
//            {
//                term = term.ToLower();
//                term = term.Trim();
//
//                var result =
//                    ExecutorList
//                        .Where(x =>
//                            x.Name.ToLower().Contains(term) || x.Ip.ToLower().Contains(term)
//                        )
//                        .ToList();
//
//                return Ok(result);
//            }
//
//            return Ok(ExecutorList);
//        }
    }
}