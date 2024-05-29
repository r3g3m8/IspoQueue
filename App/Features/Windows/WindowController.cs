using IspoQueue.App.Features.Queue;
using IspoQueue.App.Repositories;
using IspoQueue.DAL.Models;
using Microsoft.AspNetCore.Mvc;

namespace IspoQueue.App.Features.Windows;

[ApiController]
[Route("api/[controller]")]
public class WindowController : ControllerBase
{
    private readonly IGenericRepo<Window> _windowRepo;
    private readonly IGenericRepo<Cabinet> _cabinetRepo;

    public WindowController(IGenericRepo<Window> windowRepo, IGenericRepo<Cabinet> cabinetRepo)
    {
        _windowRepo = windowRepo;
        _cabinetRepo = cabinetRepo;
    }

    [HttpGet("cabinetWindows/{cabinetId}")]
    public async Task<ActionResult<IEnumerable<WindowDTO>>> GetWindowsByCabinet(string cabinetId)
    {
        try
        {
            Guid id = new Guid(cabinetId);
            var windows = await _windowRepo.Get();
            if(windows is null)
                return Ok(new Response { Status = "Ошибка", Message = "Окна не найдены", });
            var cabWindows = windows.Where(w => w.CabinetId == id).OrderBy(w => w.Name);
            List<WindowDTO> windowDtos = new();
            foreach (var window in cabWindows)
            {
                var winDto = new WindowDTO()
                {
                    Id = window.Id,
                    Name = window.Name,
                    IsActive = window.IsActive
                };
                windowDtos.Add(winDto);
            }
        
            return Ok(windowDtos);
        }
        catch (Exception ex)
        {
            return StatusCode(500,new Response { Status = "Ошибка", Message = $"Окно не добавлено. Error: {ex}" });
        }
    }
    
    [HttpPost("{cabinetId}")]
    public async Task<IActionResult> AddWindowToCabinet(Guid cabinetId, [FromBody] WindowDTO windowDto)
    {
        try
        {
            if (windowDto == null || cabinetId == Guid.Empty)
                return Ok(new Response { Status = "Ошибка", Message = "Данные не валидны", });

            var cabinet = await _cabinetRepo.FindById(cabinetId);
            if(cabinet == null)
                return Ok(new Response { Status = "Ошибка", Message = "Кабинет не найден", });

            var windows = await _windowRepo.Get();
            var uniqueWindows = windows.Where(w => w.CabinetId == cabinetId);
            foreach (var uniqueWindow in uniqueWindows)
            {
                if (uniqueWindow.Name == windowDto.Name)
                    return Ok(new Response { Status = "Ошибка", Message = "Окно с таким именем уже есть", });
            }

            var window = new Window
            {
                Id = new Guid(),
                Name = windowDto.Name,
                IsActive = windowDto.IsActive,
                CabinetId = cabinetId
            };

            await _windowRepo.Create(window);
            return Ok(new Response { Status = "Успех", Message = "Окно добавлено", });
        }
        catch (Exception ex)
        {
            return StatusCode(500,new Response { Status = "Ошибка", Message = $"Окно не добавлено. Error: {ex}" });
        }
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateWindow(Guid id, [FromBody] WindowDTO windowDto)
    {
        try
        {
            if (windowDto.Name == "" || id == Guid.Empty)
                return BadRequest(new Response { Status = "Ошибка", Message = "Данные не валидны", });

            var window = await _windowRepo.FindById(id);
            if (window == null)
                return NotFound(new Response { Status = "Ошибка", Message = "Окно не найдено", });
            
            var windows = await _windowRepo.Get();
            var cabId = window.CabinetId;
            var uniqueWindows = windows.Where(w => w.CabinetId == cabId);
            foreach (var uniqueWindow in uniqueWindows)
            {
                if (uniqueWindow.Name == windowDto.Name)
                    return BadRequest(new Response { Status = "Ошибка", Message = "Окно с таким именем уже есть", });
            }

            window.Name = windowDto.Name;
            window.IsActive = windowDto.IsActive;

            await _windowRepo.Update(window);
            return Ok(new Response { Status = "Успех", Message = "Окно изменено", });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new Response { Status = "Ошибка", Message = $"Окно не изменено. Error: {ex}" });
        }
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteWindow(Guid id)
    {
        try
        {
            var window = await _windowRepo.FindById(id);
            if (window == null)
                return NotFound(new Response { Status = "Ошибка", Message = "Окно не найдено", });

            _windowRepo.Remove(window);
            return Ok(new Response { Status = "Успех", Message = "Окно удалено", });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new Response { Status = "Ошибка", Message = $"Окно не удалено. Error: {ex}" });
        }
    }
}