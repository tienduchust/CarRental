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
            return Json(ExecutorService.Search(term));
        }
    }
}