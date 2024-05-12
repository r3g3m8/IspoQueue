namespace IspoQueue.App.Features.Queue.DTO;
public class QueueDto
{
    public Guid Id { get; set; }
    public string? Number { get; set; } // rename to Key
    public DateOnly CreationTime { get; set; } // CreationDate
    public TimeOnly TimeStart { get; set; }
    public TimeOnly TimeEnd { get; set; }
    public int? StatusId { get; set; }
    //public Status Status { get; set; }
    public Guid? WindowId { get; set; }
    //public Window Window { get; set; }
}