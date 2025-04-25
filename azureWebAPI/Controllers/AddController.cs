using azureWebAPI.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace azureWebAPI.Controllers;

[ApiController]
[Route("xml/[controller]")]
public class AddController : ControllerBase
{
    private readonly IAddService _service;

    public AddController(IAddService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> GetTestItems()
    {
        string rawContent = string.Empty;
        using (var reader = new StreamReader(Request.Body,
                  encoding: Encoding.UTF8,
                  detectEncodingFromByteOrderMarks: false))
        {
            rawContent = await reader.ReadToEndAsync();
        }
   
        var msg = _service.AddXMLToDb(rawContent);
        return Ok(msg);
    }

}