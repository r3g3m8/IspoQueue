namespace IspoQueue.DAL.Models;

public class User
{
    public Guid Id { get; set; }
    public string? FirstName { get; set; }
    public string? SecondName { get; set; }
    public string Login { get; set; }
    public string PasswordHash { get; set; }
}