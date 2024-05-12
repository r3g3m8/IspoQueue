using IspoQueue.App.Features.Queue.DTO;
using IspoQueue.App.Repositories;
using IspoQueue.DAL.Enums;
using IspoQueue.DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IspoQueue.App.Features.Queue;

[ApiController]
[Route("api/[controller]")]
public class QueueController : ControllerBase
{
    private readonly IGenericRepo<DAL.Models.Queue> _queueRepo;
    public QueueController(IGenericRepo<DAL.Models.Queue> queueRepo)
    {
        _queueRepo = queueRepo;
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
                        WindowId = item.WindowId
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
    public async Task<ActionResult> AddTicket(ServiceType type)
    {
        string ticketNumber;
        switch (type)
        {
            case ServiceType.Consultation: ticketNumber = "К";break;
            default: ticketNumber = type.ToString();break;
        }

        var queueItem = new global::IspoQueue.DAL.Models.Queue
        {
            Id = new Guid(),
            Number = ticketNumber,
            CreationTime = DateTime.Now,
            TimeStart = null,
            TimeEnd = default,
            StatusId = null,
            WindowId = null
        };

        try
        {
            await _queueRepo.Create(new global::IspoQueue.DAL.Models.Queue());
            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500);
        }



    }
}

public class ResponseDto
{
    public Task result;
}