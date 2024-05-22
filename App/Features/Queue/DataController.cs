using IspoQueue.App.Features.Queue.DTO;
using IspoQueue.App.Repositories;
using IspoQueue.DAL.Models;
using Microsoft.AspNetCore.Mvc;

namespace IspoQueue.App.Features.Queue;

[ApiController]
[Route("api/[controller]")]
public class DataController : ControllerBase
{
    private readonly IGenericRepo<Role>  _roleRepo;
    private readonly IGenericRepo<Service> _serviceRepo;
    private readonly IGenericRepo<Cabinet> _cabinetRepo;
    private readonly IGenericRepo<Window> _windowRepo;

    public DataController(IGenericRepo<Role> roleRepo, IGenericRepo<Service> serviceRepo, 
        IGenericRepo<Cabinet> cabinetRepo, IGenericRepo<Window> windowRepo)
    {
        _roleRepo = roleRepo;
        _serviceRepo = serviceRepo;
        _cabinetRepo = cabinetRepo;
        _windowRepo = windowRepo;
    }

    [HttpGet("roles")]
    public async Task<ActionResult<IEnumerable<RoleDTO>>> GetRoles()
    {
        var allRoles = await _roleRepo.Get();
        List<RoleDTO> roleDtos = new();
        foreach (var role in allRoles)
        {
            var roleDto = new RoleDTO()
            {
                Id = role.Id,
                Name = role.Name
            };
            roleDtos.Add(roleDto);
        }
        
        return Ok(roleDtos);
    }

    [HttpGet("services")]
    public async Task<ActionResult<IEnumerable<ServiceDTO>>> GetServices()
    {
        var services = await _serviceRepo.Get();
        List<ServiceDTO> serviceDtos = new();
        foreach (var service in services)
        {
            var servDto = new ServiceDTO()
            {
                Id = service.Id,
                Name = service.Name,
                QueueName = service.QueueName
            };
            serviceDtos.Add(servDto);
        }
        
        return Ok(serviceDtos);
    }
    
    [HttpGet("cabinets")]
    public async Task<ActionResult<IEnumerable<CabinetDTO>>> GetCabinets()
    {
        var cabinets = await _cabinetRepo.Get();
        List<CabinetDTO> cabinetDtos = new();
        foreach (var cabinet in cabinets)
        {
            var cabDto = new CabinetDTO()
            {
                Id = cabinet.Id,
                Name = cabinet.Name,
            };
            cabinetDtos.Add(cabDto);
        }
        
        return Ok(cabinetDtos);
    }
    
    [HttpGet("cabinetWindows/{cabinetId}")]
    public async Task<ActionResult<IEnumerable<WindowDTO>>> GetWindowsByCabinet(string cabinetId)
    {
        Guid id = new Guid(cabinetId);
        var windows = await _windowRepo.Get();
        var cabWindows = windows.Where(w => w.CabinetId == id);
        List<WindowDTO> windowDtos = new();
        foreach (var window in cabWindows)
        {
            var winDto = new WindowDTO()
            {
                Id = window.Id,
                Name = window.Name,
                IsActive = window.IsActive
            };
            windowDtos.Add(winDto);
        }
        
        return Ok(windowDtos);
    }
}
