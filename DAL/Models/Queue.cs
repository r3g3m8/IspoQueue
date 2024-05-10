public class Queue {
    public Guid Id { get; set; }
    public string? Number { get; set; } 
    public DateOnly CreationTime { get; set; }
    public TimeOnly TimeStart { get; set; }
    public TimeOnly TimeEnd { get; set; }
    public int? StatusId { get; set; }
    public Guid? WindowId { get; set; }

}