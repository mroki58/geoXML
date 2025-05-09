using azureWebAPI.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Threading.Tasks;

namespace azureWebAPI.Controllers;

[ApiController]
[Route("xml")]
public class AddController : ControllerBase
{
    private readonly IAddService _aService;
    private readonly IDeleteService _dService;
    private readonly ISearchService _sService;
    private readonly IModifyService _mService;

    public AddController(IAddService addService, IDeleteService deleteService, ISearchService searchService, IModifyService modifyService)
    {
        _sService = searchService;
        _aService = addService;
        _dService = deleteService;
        _mService = modifyService;
    }

    private async Task<string> GetRawContent()
    {
        string rawContent = string.Empty;
        using (var reader = new StreamReader(Request.Body,
                  encoding: Encoding.UTF8,
                  detectEncodingFromByteOrderMarks: false))
        {
            rawContent = await reader.ReadToEndAsync();
        }
        return rawContent;
    }

    [HttpPost]
    public async Task<IActionResult> PostXml()
    {
        string body = await GetRawContent();
        var msg = _aService.AddXMLToDb(body);
        return Ok(msg);
    }

    [HttpDelete]
    public IActionResult DeleteXmlForNode([FromQuery] string nodeName, [FromQuery] string nodeValue)
    {
        var msg = _dService.DeleteXmlForNode(nodeName, nodeValue);
        return Ok(msg);
    }

    [HttpDelete]
    [Route("attr")]
    public IActionResult DeleteXmlForAttribute([FromQuery] string nodeName,[FromQuery] string attrName, [FromQuery] string attrValue)
    {
        var msg = _dService.DeleteXmlForAttribute(nodeName, attrName, attrValue);
        return Ok(msg);
    }
 
    [HttpGet]
    [Route("str")]
    public IActionResult GetXmlNode([FromQuery] string path)
    {
        if (string.IsNullOrEmpty(path))
        {
            return BadRequest("Path is null or empty.");
        }
        
        var msg = _sService.GetXmlNode(path);
        return Ok(msg);
    }

    [HttpPatch]
    [Route("node/{id}")]
    public IActionResult ModifyNodeValue([FromQuery] string path, [FromQuery] string value, [FromRoute] int id)
    {
        if (string.IsNullOrEmpty(path) || string.IsNullOrEmpty(value))
        {
            return BadRequest("Path or value is null or empty.");
        }
        
        var msg = _mService.ModifyNodeValue(path, value, id);
        return Ok(msg);
    }
   
    [HttpPatch]
    [Route("attr/{id}")]
    public IActionResult ModifyAttrValue([FromQuery] string path, [FromQuery] string attr, [FromQuery] string value, [FromRoute] int id)
    {
        if (string.IsNullOrEmpty(path) || string.IsNullOrEmpty(attr) || string.IsNullOrEmpty(value))
        {
            return BadRequest("Path, attribute or value is null or empty.");
        }
        
        var msg = _mService.ModifyAttrValue(path, attr, value, id);
        return Ok(msg);
    }

}