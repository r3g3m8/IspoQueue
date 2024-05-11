using IspoQueue.Features.Queue;
using IspoQueue.Features.Queue.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IspoQueue.Controllers.Queue;

[ApiController]
[Route("api/[controller]")]
public class QueueController : ControllerBase
{
    private readonly AppDbContext _dbContext;
    public QueueController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<IEnumerable<QueueDTO>> GetQueue()
    {
        var queueItems = _dbContext.Queue;
        List<QueueDTO> queueDTOs = new List<QueueDTO>();

        foreach(var item in queueItems)
        {
            queueDTOs.Add(new QueueDTO
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

        return queueDTOs;
    }
}