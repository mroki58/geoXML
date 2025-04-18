using azureWebAPI.Services;
using azureWebAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace azureWebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestItemController : ControllerBase
{
    private readonly ITestItemService _service;

    public TestItemController(ITestItemService service)
    {
        _service = service;
    }

    [HttpGet]
    public IActionResult GetTestItems(int id)
    {
        var items = _service.GetTestItems();
        return Ok(items);
    }

}