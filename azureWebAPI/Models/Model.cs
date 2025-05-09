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

