namespace IspoQueue.DAL.Models
{
    public class Cabinet
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public virtual IEnumerable<Window> Windows { get; set; }
    }
}
