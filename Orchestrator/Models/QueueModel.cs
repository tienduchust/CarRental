using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;

namespace Orchestrator.Models
{
    public class QueueModel<T>
    {
        public Guid Uuid { get; set; }
        public T Value { get; set; }
    }
}