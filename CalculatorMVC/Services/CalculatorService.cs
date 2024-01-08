using CalculatorMVC.Interfaces;
using CalculatorMVC.Requests;
using CalculatorMVC.Responses;

namespace CalculatorMVC.Services
{
    public class CalculatorService : ICalculatorService
    {
        
        public async Task<CalculatorResultResponse> Calculate(CalculateRequest request)
        {
            if (request.Operand is not null && request.CurrentValue is not null)
            {
                switch (request.Action)
                {
                    case "+":
                        return new CalculatorResultResponse { Value = await AddAsync(request.CurrentValue.Value, request.Operand.Value) };
                    case "-":
                        return new CalculatorResultResponse { Value = await SubtractAsync(request.CurrentValue.Value, request.Operand.Value) };
                    case "*":
                        return new CalculatorResultResponse { Value = await MultiplyAsync(request.CurrentValue.Value, request.Operand.Value) };
                    case "/":
                        return new CalculatorResultResponse { Value = await DivideAsync(request.CurrentValue.Value, request.Operand.Value) };
                    default:
                        throw new ArgumentException("Invalid action");
                }
            }
            else
            {
                throw new ArgumentNullException("Operand and CurrentValue cannot be null");
            }
        }

        private static async Task<double> AddAsync(double operand1, double operand2)
        {
            return await Task.FromResult(operand1 + operand2);
        }

        private static async Task<double> SubtractAsync(double operand1, double operand2)
        {
            return await Task.FromResult(operand1 - operand2);
        }

        private static async Task<double> MultiplyAsync(double operand1, double operand2)
        {
            return await Task.FromResult(operand1 * operand2);
        }

        private static async Task<double> DivideAsync(double dividend, double divisor)
        {
            return await Task.FromResult(dividend / divisor);
        }
    }
}
