using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using IspoQueue.App.Repositories;
using IspoQueue.DAL.Helpers;
using IspoQueue.DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace IspoQueue.App.Features.Auth;

[Route("api/[controller]")]
[ApiController]
public class AuthenticationController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly IGenericRepo<User> _userRepo;
    private readonly IGenericRepo<Role> _rolesRepo;
    

    public AuthenticationController(IConfiguration configuration, IGenericRepo<User> userRepository, IGenericRepo<Role> rolesRepo)
    {
        _configuration = configuration;
        _userRepo = userRepository;
        _rolesRepo = rolesRepo;
    }
    
    [HttpGet("verify-token")]
    public IActionResult VerifyToken()
    {
        try
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Secret"]);

            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                // set ClockSkew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken validatedToken);

            return Ok(new { valid = true });
        }
        catch (Exception)
        {
            return Unauthorized(new { valid = false });
        }
    }


    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        var users = await _userRepo.Get();
        var user = users.FirstOrDefault(u => u.Login == loginDto.Login);
        if (user == null || user.PasswordHash != HashPasswordHelper.HashPassowrd(loginDto.Password))
            return Unauthorized(new { message = "Invalid login or password" });

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Secret"]); // Убедитесь, что это секретный ключ из настроек
        var allRoes = await _rolesRepo.Get();
        var roleNames = user.UserRoles.Where(ur => allRoes != null && allRoes.Contains(ur.Role)).Select(r => r.Role.Name);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.PrimarySid, user.Id.ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Login),
            }),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        if (user.FirstName != null) 
            tokenDescriptor.Subject.AddClaim(new Claim(ClaimTypes.Name, user.FirstName));
        if(user.SecondName != null)
            tokenDescriptor.Subject.AddClaim(new Claim(ClaimTypes.Surname, user.SecondName));
        if(!roleNames.Equals(Enumerable.Empty<string>()))
            tokenDescriptor.Subject.AddClaim(new Claim(ClaimTypes.Role, string.Join(", ", roleNames)));
        
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var tokenString = tokenHandler.WriteToken(token);

        return Ok(new
        {
            Token = tokenString,
            User = new { user.Id, user.FirstName, user.SecondName, user.Login, Roles = roleNames }
        });
    }
}

public class LoginDto
{
    public string Login { get; set; }
    public string Password { get; set; }
}