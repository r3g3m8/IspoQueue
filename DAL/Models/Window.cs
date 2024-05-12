namespace IspoQueue.DAL.Models;

public class Window {
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public bool IsActive { get; set; }
    public Guid CabinetId { get; set; }

}