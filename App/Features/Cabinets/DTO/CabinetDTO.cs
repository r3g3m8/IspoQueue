using IspoQueue.App.Features.Queue.DTO;

public class CabinetDTO
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public List<WindowDTO>? Windows { get; set; }
}