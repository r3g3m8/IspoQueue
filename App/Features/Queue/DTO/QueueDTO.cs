namespace IspoQueue.App.Features.Queue.DTO;
public class QueueDto
{
    public Guid Id { get; set; }
    public string? Number { get; set; } // rename to Key
    public DateTime CreationTime { get; set; } // CreationDate
    public DateTime? TimeStart { get; set; }
    public DateTime? TimeEnd { get; set; }
    public int? StatusId { get; set; }
    //public Status Status { get; set; }
    public Guid? WindowId { get; set; }
    //public Window Window { get; set; }
}