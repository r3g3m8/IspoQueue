using System.Security.Cryptography;
using System.Text;
using IspoQueue.App.Features.Queue.DTO;
using IspoQueue.App.Repositories;
using IspoQueue.DAL.Helpers;
using IspoQueue.DAL.Models;
using IspoQueue.DAL.Models.MediateModel;
using Microsoft.AspNetCore.Mvc;

namespace IspoQueue.App.Features.Queue
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IGenericRepo<User> _userRepo;
        private readonly IGenericRepo<UserToRole> _userRolesRepo;
        private readonly IGenericRepo<UserToWindow> _userWindowsRepo;

        public UserController(IGenericRepo<User> userRepo, IGenericRepo<UserToRole> userRolesRepo,
            IGenericRepo<UserToWindow> userWindowsRepo)
        {
            _userRepo = userRepo;
            _userRolesRepo = userRolesRepo;
            _userWindowsRepo = userWindowsRepo;
        }

        // todo Добвить ограничение только для админов
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetUser()
        {
            var users = await _userRepo.Get();
            List<UserDTO> userDtos = new();

            if (users == null)
            {
                return Ok(new UserDTO());
            }

            foreach (var user in users)
            {
                var userDto = new UserDTO
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    SecondName = user.SecondName,
                    Login = user.Login,
                    Password = user
                        .PasswordHash, // Обратите внимание, что реальный пароль не должен отправляться клиенту.
                    Roles = user.UserRoles.Select(ur => new RoleDTO() { Id = ur.RoleId, Name = ur.Role.Name }).ToList(),
                    Windows = user.UserWindows.Select(uw => new WindowDTO { Id = uw.Window.Id, Name = uw.Window.Name })
                        .ToList(),
                    Cabinet = user.UserWindows.Select(uw =>
                        new CabinetDTO() { Id = uw.Window.CabinetId, Name = uw.Window.Cabinet.Name }).FirstOrDefault()
                };
                userDtos.Add(userDto);
            }

            return Ok(userDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDTO>> GetUserById(string id)
        {
            try
            {
                if (string.IsNullOrEmpty(id))
                    return BadRequest(new Response() { Status = "Ошибка", Message = "Пользователь не найден" });
                    
                Guid userId = new Guid(id);
                var user = await _userRepo.FindById(userId);

                if (user == null)
                    return BadRequest(new Response() { Status = "Ошибка", Message = "Пользователь не найден" });

                var userDto = new UserDTO
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    SecondName = user.SecondName,
                    Login = user.Login,
                    Password = null, // Обратите внимание, что реальный пароль не должен отправляться клиенту.
                    Roles = user.UserRoles.Select(ur => new RoleDTO() { Id = ur.RoleId, Name = ur.Role.Name }).ToList(),
                    Windows = user.UserWindows.Select(uw => new WindowDTO() { Id = uw.Window.Id, Name = uw.Window.Name })
                        .ToList(),
                    Cabinet = user.UserWindows.Select(uw =>
                        new CabinetDTO() { Id = uw.Window.CabinetId, Name = uw.Window.Cabinet.Name }).FirstOrDefault()
                };

                return Ok(userDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
            
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(Guid id, [FromBody] UserDTO updateUserDto)
        {
            if (updateUserDto == null)
                return Ok(new Response { Status = "Ошибка", Message = "Некорректные данные" });

            var user = await _userRepo.FindById(id);
            if (user == null)
                return NotFound(new Response { Status = "Ошибка", Message = "Пользователь не найден" });

            user.FirstName = updateUserDto.FirstName;
            user.SecondName = updateUserDto.SecondName;
            user.Login = updateUserDto.Login;

            try
            {
                // Обновление ролей пользователя
                var existingRoles = user.UserRoles;
                foreach (var existingRole in existingRoles)
                {
                    await _userRolesRepo.Delete(existingRole);
                }

                foreach (var role in updateUserDto.Roles)
                {
                    var userRole = new UserToRole
                    {
                        Id = Guid.NewGuid(),
                        UserId = user.Id,
                        RoleId = role.Id
                    };
                    await _userRolesRepo.Create(userRole);
                }

                // Обновление окон пользователя
                var existingWindows = user.UserWindows;
                foreach (var existingWindow in existingWindows)
                {
                    await _userWindowsRepo.Delete(existingWindow);
                }

                foreach (var window in updateUserDto.Windows)
                {
                    var userWindow = new UserToWindow
                    {
                        Id = Guid.NewGuid(),
                        UserId = user.Id,
                        WindowId = window.Id
                    };
                    await _userWindowsRepo.Create(userWindow);
                }

                await _userRepo.Update(user);
                return Ok(new Response { Status = "Успех", Message = "Пользователь обновлен" });
            }
            catch (Exception ex)
            {
                return Ok(new Response
                    { Status = "Ошибка", Message = $"Ошибка при изменении пользователя: {ex.Message}" });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var user = await _userRepo.FindById(id);

            if (user == null)
            {
                return NotFound();
            }

            await _userRepo.Delete(user);

            return Ok(new Response { Status = "Успех", Message = "Пользователь добавлен" });
        }

        [HttpPost("/api/user/add")]
        public async Task<ActionResult<Response>> AddUser([FromBody] UserDTO requestBody)
        {
            if (requestBody == null)
                return BadRequest(new Response { Status = "Ошибка", Message = "Некорректные данные" });

            var user = new User
            {
                Id = Guid.NewGuid(),
                FirstName = requestBody.FirstName,
                SecondName = requestBody.SecondName,
                Login = requestBody.Login,
                PasswordHash = HashPasswordHelper.HashPassowrd(requestBody.Password)
            };

            try
            {
                await _userRepo.Create(user);

                foreach (var role in requestBody.Roles)
                {
                    if (role.Id != Guid.Empty)
                    {
                        var userRole = new UserToRole
                        {
                            Id = Guid.NewGuid(),
                            UserId = user.Id,
                            RoleId = role.Id
                        };
                        await _userRolesRepo.Create(userRole);
                    }
                }

                foreach (var window in requestBody.Windows)
                {
                    if (window.Id != Guid.Empty)
                    {
                        var userWindow = new UserToWindow
                        {
                            Id = Guid.NewGuid(),
                            UserId = user.Id,
                            WindowId = window.Id
                        };
                        await _userWindowsRepo.Create(userWindow);
                    }
                }

                return Ok(new Response { Status = "Успех", Message = "Пользователь добавлен" });
            }
            catch (Exception ex)
            {
                return Ok(new Response
                    { Status = "Ошибка", Message = $"Ошибка при добавлении пользователя: {ex.Message}" });
            }
        }
    }
}
