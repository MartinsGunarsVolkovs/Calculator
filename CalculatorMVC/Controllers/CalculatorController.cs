using CalculatorMVC.Requests;
using CalculatorMVC.Responses;
using Microsoft.AspNetCore.Mvc;

namespace CalculatorMVC.Controllers
{
    public class CalculatorController : Controller
    {
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            return await Task.Run(() => View());
        }

        [HttpPost]
        public async Task<ActionResult<CalculatorResultResponse>> Calculate([FromBody] CalculateRequest request)
        {
            if (ModelState.IsValid)
            {
                return Ok(new CalculatorResultResponse { Value = 1.0});
            }
            return BadRequest(ModelState);
        }
    }
}
