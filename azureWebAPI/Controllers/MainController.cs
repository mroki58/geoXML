using azureWebAPI.Models;
using DbLibrary;
using Microsoft.AspNetCore.Mvc;


namespace azureWebAPI.Controllers;

[ApiController]
[Route("/")]
public class MainController : ControllerBase
{
    private readonly AppResources _appResources;
    public MainController(AppResources appResources)
    {
        _appResources = appResources;
    }

    [HttpPost("xml/create")]
    public IActionResult CreateXml([FromBody] DepositDto dto)
    {
        var deposit = Deposit.CreateDeposit(dto.Name?? "");
        deposit.setGeology(dto.Type?? "", dto.EstimatedVolume, dto.Depth, dto.Status?? "");
        deposit.setGeography(dto.Location?? "", dto.Region?? "", dto.Latitude, dto.Longitude, dto.Radius);

        var xml = deposit.createXmlUsingDb(_appResources.Db);
        return Ok(xml);
    }

    [HttpPost("xml")]
    public IActionResult AddXml([FromBody] XmlDto xml)
    {
        if(xml?.Xml == null)
            return BadRequest("XML content is required.");

        var result = _appResources.repo.AddXmlToDb(xml.Xml);
        return Ok(result);
    }

    [HttpGet("all")]
    public IActionResult GetAll()
    {
        var result = _appResources.repo.GetXmlValues(".");
        return Ok(result);
    }
}