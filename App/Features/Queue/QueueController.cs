using IspoQueue.App.Features.Queue.DTO;
using IspoQueue.App.Repositories;
using IspoQueue.DAL.Enums;
using IspoQueue.DAL.Models;
using IspoQueue.DAL.Models.MediateModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Status = IspoQueue.DAL.Enums.Status;

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
    private readonly IGenericRepo<IspoQueue.DAL.Models.Status> _statusRepo;

    public QueueController(IGenericRepo<DAL.Models.Queue> queueRepo, IGenericRepo<Service> serviceRepo,
        IGenericRepo<UserToRole> userRolesRepo, IGenericRepo<ServiceToRole> roleServicesRepo,
        IGenericRepo<UserToWindow> userWindowsRepo, IGenericRepo<Window> windowRepo,
        IGenericRepo<DAL.Models.Status> statusRepo)
    {
        _queueRepo = queueRepo;
        _serviceRepo = serviceRepo;
        _userRolesRepo = userRolesRepo;
        _roleServicesRepo = roleServicesRepo;
        _userWindowsRepo = userWindowsRepo;
        _windowRepo = windowRepo;
        _statusRepo = statusRepo;
    }

    [HttpGet]
    public async Task<IEnumerable<QueueDto>> GetQueue()
    {
        try
        {
            var allQueue = await _queueRepo.Get();
            List<QueueDto> queueDto = new List<QueueDto>();

            if (allQueue != null)
            {
                var queueItems = allQueue.Where(q => q.WindowId != null);
                foreach (var item in queueItems)
                {
                    var status = await _statusRepo.FindById(item.StatusId.Value);
                    var statusName = status.Name;

                    var windowName = "";
                    var window = await _windowRepo.FindById(item.WindowId.Value);
                    if (window != null)
                        windowName = window.Name;

                    queueDto.Add(new QueueDto
                    {
                        Id = item.Id,
                        Number = item.Number,
                        CreationTime = item.CreationTime,
                        TimeStart = item.TimeStart,
                        TimeEnd = item.TimeEnd,
                        Status = statusName,
                        Window = windowName,
                        ServiceId = item.ServiceId
                    });
                }
            }

            return queueDto.OrderByDescending(q => q.TimeStart);
        }
        catch (Exception ex)
        {
            return new List<QueueDto>();
        }
    }
    
    [HttpGet("/api/queue/get")]
    public async Task<IEnumerable<QueueDto>> GetOperatorQueue([FromQuery] QueueRequest param1)
    {
        try
        {
            var queueItems = await _queueRepo.Get();
            List<QueueDto> queueDto = new List<QueueDto>();

            if (param1 == null)
                return null;
            
            var roles = await _userRolesRepo.Get();
            var userRoles = roles.Where(r => r.UserId == param1.UserId).Select(r => r.RoleId);

            var services = await _roleServicesRepo.Get();
            var userServices = services.Where(s => userRoles.Contains(s.RoleId)).Select(s => s.ServiceId);
            
            if (queueItems != null)
            {
                var lastQueue = queueItems.Where(q => userServices.Contains(q.ServiceId)).OrderBy(q => q.CreationTime).Take(5);
                foreach (var item in lastQueue)
                {
                    var status = await _statusRepo.FindById(item.StatusId.Value);
                    var statusName = status.Name;
                    
                    var window = await _windowRepo.FindById(item.WindowId.Value);
                    var windowName = window.Name;
                    queueDto.Add(new QueueDto
                    {
                        Id = item.Id,
                        Number = item.Number,
                        CreationTime = item.CreationTime,
                        TimeStart = item.TimeStart,
                        TimeEnd = item.TimeEnd,
                        Status = statusName,
                        Window = windowName,
                        ServiceId = item.ServiceId
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
    public async Task<ActionResult> AddTicket([FromBody] TicketDTO request)
    {
        if (request == null)
            return Ok(new Response { Status = "Ошибка", Message = "Данные не передаются", });
        
        var serviceId = request.ServiceId;
        var service = await _serviceRepo.FindById(serviceId);
        if (service == null)
            return Ok(new Response { Status = "Ошибка", Message = "Сервис не найден", });

        var queue = await _queueRepo.Get();

        var ticketDigit = 0;
        if (queue != null)
            ticketDigit = queue.Select(x => x.ServiceId == serviceId).Count() % 100;

        var queueItem = new DAL.Models.Queue
        {
            Id = new Guid(),
            Number = service.IdentityStr + ticketDigit,
            CreationTime = DateTime.UtcNow,
            TimeStart = null,
            TimeEnd = null,
            StatusId = (int)DAL.Enums.Status.Waiting,
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

    [HttpPut]
    public async Task<ActionResult> AcceptTicket([FromBody] AcceptTicketDTO accept)
    {
        try
        {
            if (accept == null)
                return Ok(new Response { Status = "Ошибка", Message = "Пользователь не найден." });

            var userId = accept.UserId;
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
                // Взяли все роли у пользователя
                var userRoles = usersRoles.Where(role => role.UserId == userId).Select(x => x?.RoleId).ToArray();

                if (userRoles == null)
                    return Ok(new Response { Status = "Ошибка", Message = "У пользователя не ролей" });
                
                // Получить все сервисы по ролям пользователя
                var servicesToRole = await _roleServicesRepo.Get();
                var roleServices = servicesToRole
                    .Where(s => userRoles.Contains(s.RoleId))
                    .Select(service => service?.ServiceId);

                if (roleServices == null)
                    return Ok(new Response { Status = "Ошибка", Message = "Нет услуг" });

                //Get all queue
                var queue = await _queueRepo.Get();

                if (queue == null)
                    return Ok(new Response { Status = "Ошибка", Message = "Очередь пуста" });

                //Take first queue item
                foreach (var service in roleServices)
                {
                    var queueItem = queue
                        .OrderBy(q => q.CreationTime)
                        .FirstOrDefault(item => item.ServiceId == service && item.StatusId == (int)Status.Waiting);
                    if (queueItem != null)
                    {
                        queueItem = new DAL.Models.Queue
                        {
                            Id = queueItem.Id,
                            Number = queueItem.Number,
                            CreationTime = queueItem.CreationTime,
                            TimeStart = DateTime.UtcNow, // Time only push
                            TimeEnd = null,
                            StatusId = (int)DAL.Enums.Status.Active,
                            ServiceId = queueItem.ServiceId,
                            WindowId = userActiveWindow?.FirstOrDefault()?.Id
                        };
                        await _queueRepo.Update(queueItem);
                        return Ok(new Response { Status = "Успех", Message = "Заявка принята" });
                    }
                    return Ok(new Response { Status = "Успех", Message = "Нет подходящего статуса заявки" });
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