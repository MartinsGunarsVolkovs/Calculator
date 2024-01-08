using CalculatorMVC.Requests;
using CalculatorMVC.Responses;

namespace CalculatorMVC.Interfaces
{
    public interface ICalculatorService
    {
        Task<CalculatorResultResponse> Calculate(CalculateRequest request);
    }
}
