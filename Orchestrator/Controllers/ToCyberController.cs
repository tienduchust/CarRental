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
        public IActionResult Add(ToCyberModel model)
        {
            var result = ToCyberService.Add(model);
            return Json(result);
        }
    }
}