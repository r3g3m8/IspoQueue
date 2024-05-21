namespace IspoQueue.DAL.Models.MediateModel;

public class ServiceToRole
{
    public Guid Id { get; set; }
    public Guid RoleId { get; set; }
    public int ServiceId { get; set; }
    public virtual Role Role { get; set; }
    public virtual Service Service { get; set; }
}