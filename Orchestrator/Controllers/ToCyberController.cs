using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Orchestrator.Models;
using Orchestrator.Services;

namespace Orchestrator.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ToCyberController : Controller
    {
        private ToCyberService ToCyberService { get; }

        public ToCyberController(ToCyberService toCyberService)
        {
            ToCyberService = toCyberService;
        }

        [HttpPost("[action]")]
        public IActionResult Add(List<ToCyberModel> models)
        {
            var result = ToCyberService.Add(models);
            return Ok(result);
        }
        [HttpGet("[action]")]
        public IActionResult Browse()
        {
            var result = ToCyberService.Browse();
            return Ok(result);
        }
    }
}