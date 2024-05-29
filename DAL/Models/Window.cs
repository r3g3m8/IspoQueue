using IspoQueue.DAL.Models.MediateModel;

namespace IspoQueue.DAL.Models;

public class Window {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public bool IsActive { get; set; }
    public Guid CabinetId { get; set; }
    public virtual Cabinet Cabinet { get; set; }
    public virtual IEnumerable<UserToWindow> UserWindows { get; set; }
    public virtual IEnumerable<Queue> Queues { get; set; }
}