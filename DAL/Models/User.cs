// User.cs

using IspoQueue.DAL.Models;

public class User
{
    public int Id { get; set; }
    public string Login { get; set; }
    public string Password { get; set; }
    public Role Role { get; set; }
    public List<Service>? Services { get; set; }
}
