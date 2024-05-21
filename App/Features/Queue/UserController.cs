using System.Security.Cryptography;
using System.Text;
using IspoQueue.App.Features.Queue.DTO;
using IspoQueue.App.Repositories;
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

        public UserController(IGenericRepo<User> userRepo, IGenericRepo<UserToRole> userRolesRepo, IGenericRepo<UserToWindow> userWindowsRepo)
        {
            _userRepo = userRepo;
            _userRolesRepo = userRolesRepo;
            _userWindowsRepo = userWindowsRepo;
        }

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
                    Password = user.PasswordHash,  // Обратите внимание, что реальный пароль не должен отправляться клиенту.
                    Roles = user.UserRoles.Select(ur => ur.Role.Name).ToList(),
                    Windows = user.UserWindows.Select(uw => new WindowDTO { Id = uw.Window.Id, Name = uw.Window.Name }).ToList()
                };
                userDtos.Add(userDto);
            }
            
            return Ok(userDtos);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDTO>> GetUserById(Guid id)
        {
            var user = await _userRepo.FindById(id);

            if (user == null)
            {
                return NotFound();
            }

            var userDto = new UserDTO
            {
                Id = user.Id,
                FirstName = user.FirstName,
                SecondName = user.SecondName,
                Login = user.Login,
                Password = "расхэшированный",  // Обратите внимание, что реальный пароль не должен отправляться клиенту.
                Roles = user.UserRoles.Select(ur => ur.Role.Name).ToList(),
                Windows = user.UserWindows.Select(uw => new WindowDTO() { Id = uw.Window.Id, Name = uw.Window.Name }).ToList()
            };

            return Ok(userDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(Guid id, [FromBody] UpdateUserDto updateUserDto)
        {
            var user = await _userRepo.FindById(id);

            if (user == null)
            {
                return NotFound();
            }

            user.FirstName = updateUserDto.FirstName;
            user.SecondName = updateUserDto.SecondName;
            user.Login = updateUserDto.Login;
            user.PasswordHash = user.PasswordHash;

            await _userRepo.Update(user);

            return Ok(new Response { Status = "Успех", Message = "Пользователь добавлен" });
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
        public async Task<ActionResult<Response>> AddUser([FromBody] AddUserRequest requestBody)
        {
            if (requestBody == null)
                return BadRequest(new Response { Status = "Ошибка", Message = "Некорректные данные" });
            
            var user = new User
            {
                Id = Guid.NewGuid(),
                FirstName = requestBody.FirstName,
                SecondName = requestBody.SecondName,
                Login = requestBody.Login,
                PasswordHash = HashPassword(requestBody.Password) // Хеширование пароля
            };

            try
            {
                await _userRepo.Create(user);

                if (requestBody.RoleId.HasValue)
                {
                    var userRole = new UserToRole
                    {
                        Id = Guid.NewGuid(),
                        UserId = user.Id,
                        RoleId = requestBody.RoleId.Value
                    };
                    await _userRolesRepo.Create(userRole);
                }
                
                if (requestBody.WindowId.HasValue)
                {
                    var userWindow = new UserToWindow
                    {
                        Id = Guid.NewGuid(),
                        UserId = user.Id,
                        WindowId = requestBody.WindowId.Value
                    };
                    await _userWindowsRepo.Create(userWindow);
                }

                return Ok(new Response { Status = "Успех", Message = "Пользователь добавлен" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new Response { Status = "Ошибка", Message = $"Ошибка при добавлении пользователя: {ex.Message}" });
            }
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
            }
        }
    }

    public class AddUserRequest
    {
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public Guid? RoleId { get; set; }
        public Guid? WindowId { get; set; }
    }
}
