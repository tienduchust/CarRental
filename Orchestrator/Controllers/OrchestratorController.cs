using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Model.Orchestrator;
using Orchestrator.Services;

namespace Orchestrator.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrchestratorController : Controller
    {
        private OrchestratorService OrchestratorService { get; }

        public OrchestratorController(OrchestratorService orchestratorService)
        {
            OrchestratorService = orchestratorService;
        }

        [HttpPost("[action]")]
        public IActionResult EnqueueList(List<BookingModel> models)
        {
            var result = OrchestratorService.EnqueueList(models);
            return Ok(result);
        }
        [HttpGet("[action]")]
        public IActionResult BrowseQueue()
        {
            var result = OrchestratorService.BrowseQueue();
            return Ok(result);
        }
        [HttpGet("[action]/{executorId:int}")]
        public IActionResult PeekUp(int executorId)
        {
            var result = OrchestratorService.PeekUp(executorId);
            return Ok(result);
        }
        [HttpGet("[action]/{executorId:int}")]
        public IActionResult BrowseExecutor(int executorId)
        {
            var result = OrchestratorService.BrowseExecutor(executorId);
            return Ok(result);
        }
        [HttpGet("[action]")]
        public IActionResult BrowseExecutors([FromQuery]string term)
        {
            var result = OrchestratorService.BrowseExecutors(term);
            return Ok(result);
        }
    }
}