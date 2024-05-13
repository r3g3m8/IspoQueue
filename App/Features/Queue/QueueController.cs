using IspoQueue.App.Features.Queue.DTO;
using IspoQueue.App.Repositories;
using IspoQueue.DAL.Enums;
using IspoQueue.DAL.Models;
using IspoQueue.DAL.Models.MediateModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IspoQueue.App.Features.Queue;

[ApiController]
[Route("api/[controller]")]
public class QueueController : ControllerBase
{
    private readonly IGenericRepo<DAL.Models.Queue> _queueRepo;
    private readonly IGenericRepo<DAL.Models.Service> _serviceRepo;
    private readonly IGenericRepo<UserToRole> _userRolesRepo;
    private readonly IGenericRepo<ServiceToRole> _roleServicesRepo;
    private readonly IGenericRepo<UserToWindow> _userWindowsRepo;
    private readonly IGenericRepo<Window> _windowRepo;

    public QueueController(IGenericRepo<DAL.Models.Queue> queueRepo, IGenericRepo<Service> serviceRepo,
        IGenericRepo<UserToRole> userRolesRepo, IGenericRepo<ServiceToRole> roleServicesRepo, IGenericRepo<UserToWindow> userWindowsRepo, IGenericRepo<Window> windowRepo)
    {
        _queueRepo = queueRepo;
        _serviceRepo = serviceRepo;
        _userRolesRepo = userRolesRepo;
        _roleServicesRepo = roleServicesRepo;
        _userWindowsRepo = userWindowsRepo;
        _windowRepo = windowRepo;
    }

    [HttpGet]
    public async Task<IEnumerable<QueueDto>> GetQueue()
    {
        try
        {

            var queueItems = await _queueRepo.Get();
            List<QueueDto> queueDto = new List<QueueDto>();

            if (queueItems != null)
            {
                foreach (var item in queueItems)
                {
                    queueDto.Add(new QueueDto
                    {
                        Id = item.Id,
                        Number = item.Number,
                        CreationTime = item.CreationTime,
                        TimeStart = item.TimeStart,
                        TimeEnd = item.TimeEnd,
                        StatusId = item.StatusId,
                        WindowId = item.WindowId,
                    });
                }
            }

            return queueDto;
        }
        catch (Exception ex)
        {
            return new List<QueueDto>();
        }
    }

    [HttpPost]
    public async Task<ActionResult> AddTicket(int serviceId)
    {
        var service = await _serviceRepo.FindById(serviceId);

        if (service == null)
            return Ok(new Response { Status = "Failed", Message = "Service not found", });

        var queue = await _queueRepo.Get();

        var ticketDigit = 0;
        if (queue != null)
            ticketDigit = queue.Select(x => x.ServiceId == serviceId).Count() % 100;

        var queueItem = new DAL.Models.Queue
        {
            Id = new Guid(),
            Number = service.IdentityStr + ticketDigit,
            CreationTime = DateTime.Now,
            TimeStart = null,
            TimeEnd = null,
            StatusId = (int)DAL.Enums.Status.New,
            ServiceId = serviceId,
            WindowId = null
        };

        try
        {
            await _queueRepo.Create(queueItem);
            return Ok(new Response { Status = "Успех", Message = "Заявка создана", });
        }
        catch (Exception ex)
        {
            return Ok(new Response { Status = "Ошибка", Message = $"Заявка не создана. Error: {ex}" });
        }
    }

    [HttpPost]
    public async Task<ActionResult> GetTicket(Guid userId)
    {
        try
        {
            //Get user windows
            var usersWindows = await _userWindowsRepo.Get();
            var userWindows = usersWindows?.Where(window => window.UserId == userId).Select(window => window.Id);

            if (userWindows == null)
            {
                return Ok(new Response { Status = "Ошибка", Message = "У оператора нет окон." });
            }

            //Get active user windows
            var windows = await _windowRepo.Get();

            List<Window?> userActiveWindow = new List<Window?>();
            if (windows == null)
            {
                return Ok(new Response { Status = "Ошибка", Message = "Нет окон." });
            }

            foreach (var window in windows)
            {
                userActiveWindow.Add(windows.SingleOrDefault(x => x.Id == window.Id && x.IsActive));
            }

            if (userActiveWindow.Count == 0)
            {
                return Ok(new Response { Status = "Ошибка", Message = "Все окна оператора отключены." });
            }

            //Get user roles
            var usersRoles = await _userRolesRepo.Get();

            if (usersRoles != null)
            {
                var userRoles = usersRoles.Where(role => role.UserId == userId).Select(x => x?.RoleId).ToArray();


                //Get roles services
                var rolesService = await _roleServicesRepo.FindByIds(userRoles);
                var roleServices = rolesService?.Select(service => service?.ServiceId).ToArray();

                if (roleServices == null)
                {
                    return Ok(new Response { Status = "Ошибка", Message = "Нет услуг" });
                }

                //Get all queue
                var queue = await _queueRepo.Get();

                if (queue == null)
                {
                    return Ok(new Response { Status = "Ошибка", Message = "Очередь пуста" });
                }

                //Take first queue item
                foreach (var service in roleServices)
                {
                    var queueItem = queue.FirstOrDefault(item => item.ServiceId == service && item.StatusId == 1);
                    if (queueItem != null)
                    {

                        queueItem = new DAL.Models.Queue
                        {
                            Id = queueItem.Id,
                            Number = queueItem.Number,
                            CreationTime = queueItem.CreationTime,
                            TimeStart = DateTime.Now,
                            TimeEnd = null,
                            StatusId = (int)DAL.Enums.Status.Start,
                            ServiceId = queueItem.ServiceId,
                            WindowId = userActiveWindow?.FirstOrDefault()?.Id
                        };
                        await _queueRepo.Update(queueItem);
                        return Ok(new Response { Status = "Успех", Message = "Заявка принята" });
                    }

                }
            }
            return Ok(new Response { Status = "Ошибка", Message = "У оператора нет ролей" });
        }
        catch (Exception ex)
        {
            return Ok(new Response { Status = "Ошибка", Message = $"Заявка не принята. Error: {ex}" });
        }
    }
}