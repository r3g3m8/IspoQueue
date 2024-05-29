using IspoQueue.DAL.Models.MediateModel;

namespace IspoQueue.DAL.Models
{
    public class Role
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        
        public virtual IEnumerable<UserToRole> UserRoles { get; set; }
        public virtual IEnumerable<ServiceToRole> ServiceRoles { get; set; }
    }
}