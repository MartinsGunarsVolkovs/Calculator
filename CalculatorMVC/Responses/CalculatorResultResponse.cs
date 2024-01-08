using System.Text.Json.Serialization;

namespace CalculatorMVC.Responses
{
    public class CalculatorResultResponse
    {
        [JsonPropertyName("value")]
        public double Value { get; set; }
    }
}
