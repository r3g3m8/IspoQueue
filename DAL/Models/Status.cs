namespace IspoQueue.DAL.Models;

public class Status
{
    public int Id { get; set; }
    public string Name { get; set; } // Completed, Active, Waiting
    public virtual IEnumerable<Queue> Queues { get; set; }
}