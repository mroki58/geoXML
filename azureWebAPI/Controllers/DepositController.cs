using DbLibrary;
using Microsoft.AspNetCore.Mvc;
using azureWebAPI.Models;

namespace azureWebAPI.Controllers;

[ApiController]
[Route("deposit")]
public class XmlController : ControllerBase
{
    private readonly AppResources _appResources;
    private readonly XmlRepo _xmlRepo;

    public XmlController(AppResources appResources)
    {
        _appResources = appResources;
        _xmlRepo = appResources.repo;
    }   


    [HttpPatch("latitude/{id}")]
    public IActionResult PatchLatitude(int id, [FromBody] DoubleDto latitude)
    {
        if (latitude?.Value == null)
            return BadRequest("Latitude value is required.");
        var result = _xmlRepo.ModifyLatitude(latitude.Value.Value, id);
        return Ok(result);
    }

    [HttpPatch("longitude/{id}")]
    public IActionResult PatchLongitude(int id, [FromBody] DoubleDto longitude)
    {
        if (longitude?.Value == null)
            return BadRequest("Longitude value is required.");
        var result = _xmlRepo.ModifyLongitude(longitude.Value.Value, id);
        return Ok(result);
    }

    [HttpPatch("radius/{id}")]
    public IActionResult PatchRadius(int id, [FromBody] DoubleDto radius)
    {
        if (radius?.Value == null)
            return BadRequest("Radius value is required.");
        var result = _xmlRepo.ModifyRadius(radius.Value.Value, id);
        return Ok(result);
    }

    [HttpPatch("quantity/{id}")]
    public IActionResult PatchQuantity(int id, [FromBody] DoubleDto quantity)
    {
        if (quantity?.Value == null)
            return BadRequest("Quantity value is required.");
        var result = _xmlRepo.ModifyEstimatedVolume(quantity.Value.Value, id);
        return Ok(result);
    }

    [HttpPatch("name/{id}")]
    public IActionResult PatchName(int id, [FromBody] StringDto name)
    {
        if (string.IsNullOrEmpty(name?.Value))
            return BadRequest("Name value is required.");
        var result = _xmlRepo.ModifyName(name.Value, id);
        return Ok(result);
    }

    [HttpDelete("quantity")]
    public IActionResult DeleteQuantity([FromQuery] double maxValue)
    {
        var result = _xmlRepo.DeleteForQuantityLessThan(maxValue);
        return Ok(result);
    }

    [HttpDelete("name")]
    public IActionResult DeleteByName([FromQuery] string name)
    {
        var result = _xmlRepo.DeleteByName(name);
        return Ok(result);
    }

    [HttpDelete("location")]
    public IActionResult DeleteByLocation([FromQuery] string location)
    {
        var result = _xmlRepo.DeleteForLocation(location);
        return Ok(result);
    }
}
