namespace azureWebAPI.Models;

public class DepositDto
{
    public string? Name { get; set; }
    public string? Type { get; set; }
    public double EstimatedVolume { get; set; }
    public double Depth { get; set; }
    public string? Status { get; set; }
    public string? Location { get; set; }
    public string? Region { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public double Radius { get; set; }
}

public class XmlDto
{
    public string? Xml { get; set; }
}

public class DoubleDto
{
    public double? Value { get; set; }
}

public class StringDto
{
    public string? Value { get; set; }
}