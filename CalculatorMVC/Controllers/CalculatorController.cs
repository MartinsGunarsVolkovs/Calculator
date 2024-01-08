using CalculatorMVC.Interfaces;
using CalculatorMVC.Requests;
using CalculatorMVC.Responses;
using Microsoft.AspNetCore.Mvc;

namespace CalculatorMVC.Controllers
{
    public class CalculatorController : Controller
    {
        private readonly ICalculatorService _calculatorService;
        public CalculatorController(ICalculatorService calculatorService)
        {
            _calculatorService = calculatorService;
        }
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
                return Ok(await _calculatorService.Calculate(request));
            }
            return BadRequest(ModelState);
        }
    }
}
