using System.ComponentModel.DataAnnotations;

namespace CalculatorMVC.Requests
{
    [AttributeUsage(AttributeTargets.Class)]
    public class NonZeroOperandForDivisionAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is CalculateRequest calculateRequest)
            {
                if (calculateRequest.Action == "/" && calculateRequest.Operand == 0)
                {
                    return new ValidationResult("Cannot divide by zero. Operand must be a non-zero value.", new[] { nameof(CalculateRequest.Operand) });
                }

                return ValidationResult.Success;
            }

            throw new ArgumentException("Invalid object type for validation.");
        }
    }

    [NonZeroOperandForDivision]
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
