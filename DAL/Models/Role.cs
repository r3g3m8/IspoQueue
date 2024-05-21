using IspoQueue.DAL.Models.MediateModel;

namespace IspoQueue.DAL.Models
{
    public class Role
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        
        public virtual ICollection<UserToRole> UserRoles { get; set; }
        public virtual ICollection<ServiceToRole> ServiceRoles { get; set; }
    }
}