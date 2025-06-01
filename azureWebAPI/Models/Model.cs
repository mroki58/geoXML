namespace azureWebAPI.Models;

public class ReturnMessage
{
    public string? message { get; set; }
    
}

//
public class XmlData
{
    public SortedDictionary<int, List<string>>? data { get; set; }
    public string? message { get; set; }

}

public class CreateXmlRequest
{
    public string? name { get; set; }
    public string? type { get; set; }
    public double estimatedVolume { get; set; }
    public double depth { get; set; }
    public string? status { get; set; }
    public string? location { get; set; }
    public string? region { get; set; }
    public double latitude { get; set; }
    public double longitude { get; set; }
    public double radius { get; set; }
}


public class MyXML
{
    public string? xml { get; set; }
}

