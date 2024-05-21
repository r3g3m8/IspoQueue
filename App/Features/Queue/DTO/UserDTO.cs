namespace IspoQueue.App.Features.Queue.DTO;

public class UserDTO
{
    public Guid Id { get; set; }
    public string? FirstName { get; set; }
    public string? SecondName { get; set; }
    public string Login { get; set; }
    public string Password { get; set; }
    public List<string> Roles { get; set; }
    public List<WindowDTO> Windows { get; set; }
}

