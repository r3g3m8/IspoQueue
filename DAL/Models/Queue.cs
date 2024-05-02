public class Queue {
    public int Id { get; set; }
    public string Key { get; set; } 
    public DateOnly Date { get; set; }
    public TimeOnly? TimeStart { get; set; }
    public TimeOnly? TimeEnd { get; set; }
    public Status Status { get; set; }
    public User? Operator { get; set; }
    public Services? Service { get; set; }

}