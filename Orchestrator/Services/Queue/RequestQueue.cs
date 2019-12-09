using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Orchestrator.Models;

namespace Orchestrator.Services.Queue
{
    public static class RequestQueue<T>
    {
        private static ConcurrentQueue<QueueModel<T>> _queue;

        public static ConcurrentQueue<QueueModel<T>> Queue
        {
            get
            {
                if (_queue == null)
                {
                    _queue = new ConcurrentQueue<QueueModel<T>>();
                }

                return _queue;
            }
        }
    }
}