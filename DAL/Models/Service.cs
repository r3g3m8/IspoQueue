using IspoQueue.DAL.Models.MediateModel;

namespace IspoQueue.DAL.Models;

public class Service {
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? IdentityStr { get; set; }
    public virtual ICollection<ServiceToRole> ServiceRoles { get; set; }
    public virtual ICollection<Queue> Queues { get; set; }
}