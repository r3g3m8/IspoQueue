using System.Security.Cryptography;
using System.Text;
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
