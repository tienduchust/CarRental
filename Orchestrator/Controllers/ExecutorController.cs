using System;
using Microsoft.AspNetCore.Mvc;
using Orchestrator.Services;

namespace Orchestrator.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExecutorController : Controller
    {
        private ExecutorService ExecutorService { get; }

        public ExecutorController(ExecutorService executorService)
        {
            ExecutorService = executorService;
        }

        [HttpGet("[action]")]
        public IActionResult Search([FromQuery]string term = null)
        {
            var result = ExecutorService.Search(term);
            return Ok(result);
        }
        [HttpGet("[action]/{id:int}")]
        public IActionResult PeekUp(int id)
        {
            var result = ExecutorService.PeekUp(id);
            return Ok(result);
        }
//        [HttpPost("[action]/{queueUuid:guid}")]
//        public IActionResult FinishUp([FromQuery]Guid queueUuid)
//        {
//            return Json(ExecutorService.FinishUp(queueUuid));
//        }
    }
}