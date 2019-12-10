using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Orchestrator
{
    public class BookingModel
    {
        public string Code { get; set; }
        public string CreatedAt { get; set; }
        public string Json { get; set; }

        public BookingModel(string code, string createdAt, string json)
        {
            Code = code;
            CreatedAt = createdAt;
            Json = json;
        }
    }
}
