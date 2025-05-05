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

    public AddController(IAddService addService, IDeleteService deleteService, ISearchService searchService)
    {
        _sService = searchService;
        _aService = addService;
        _dService = deleteService;
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
    public IActionResult GetStringValueNode([FromQuery] int id, [FromQuery] string path)
    {
        if (string.IsNullOrEmpty(path))
        {
            return BadRequest("Path is null or empty.");
        }
        if (id <= 0)
        {
            return BadRequest("Id must be greater than 0.");
        }
    {
        var msg = _sService.GetStringValueNode(path, id);
        return Ok(msg);
    }

}