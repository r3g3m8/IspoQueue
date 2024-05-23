namespace IspoQueue.App.Features.Queue.DTO;
public class QueueDto
{
    public Guid Id { get; set; }
    public string? Number { get; set; } 
    public DateTime CreationTime { get; set; }
    public DateTime? TimeStart { get; set; }
    public DateTime? TimeEnd { get; set; }
    public string? ServiceName { get; set; }
    public int StatusId { get; set; }
    public string Window { get; set; }
    public string? Cabinet { get; set; }
}