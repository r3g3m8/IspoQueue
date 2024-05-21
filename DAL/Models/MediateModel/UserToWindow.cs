namespace IspoQueue.DAL.Models.MediateModel;

public class UserToWindow {
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid WindowId { get; set; }
    public virtual User User { get; set; }
    public virtual Window Window { get; set; }
}