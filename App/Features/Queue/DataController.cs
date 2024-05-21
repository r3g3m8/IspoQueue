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

    public DataController(IGenericRepo<Role> roleRepo, IGenericRepo<Service> serviceRepo)
    {
        _roleRepo = roleRepo;
        _serviceRepo = serviceRepo;
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
}
