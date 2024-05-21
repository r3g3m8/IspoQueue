using IspoQueue.DAL.Models.MediateModel;

namespace IspoQueue.DAL.Models;

public class Service {
    public int Id { get; set; }
    public string Name { get; set; }
    public string IdentityStr { get; set; }
    public string QueueName { get; set; }
    public virtual IEnumerable<ServiceToRole> ServiceRoles { get; set; }
    public virtual IEnumerable<Queue> Queues { get; set; }
}