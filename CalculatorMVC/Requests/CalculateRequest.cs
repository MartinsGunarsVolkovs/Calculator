using System.ComponentModel.DataAnnotations;

namespace CalculatorMVC.Requests
{
    public class CalculateRequest
    {
        [Required(ErrorMessage = "Action is required")]
        [RegularExpression(@"[+\-*/=]", ErrorMessage = "Invalid action")]
        public string? Action { get; set; }

        [Required(ErrorMessage = "Value is required")]
        public double? CurrentValue { get; set; }

        [Required(ErrorMessage = "Operand is required")]
        public double? Operand { get; set; }
    }
}
