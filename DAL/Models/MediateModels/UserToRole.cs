namespace IspoQueue.DAL.Models.MediateModels;

public class UserToRole
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid RoleId { get; set; }
}