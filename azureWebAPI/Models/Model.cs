namespace azureWebAPI.Models;

public class ReturnMessage
{
    public string? message { get; set; }
    
}

//
public class StringData
{
    public List<string>? data { get; set; } 
    public string? message { get; set; }
}

public class XMLData
{
    public string? xml { get; set; } 
    public string? message { get; set; }
}