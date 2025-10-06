using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnet_orders.Models.Dtos;
using dotnet_orders.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.JsonWebTokens;
using System.Security.Claims;
using dotnet_orders.DTOs;

namespace dotnet_orders.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest req)
        {
            if (req == null || string.IsNullOrWhiteSpace(req.Email) || string.IsNullOrWhiteSpace(req.Password))
                return BadRequest(new { message = "Email and password required" });

            var result = await _authService.AuthenticateAsync(req);
            if (result == null)
                return Unauthorized(new { message = "Invalid credentials" });

            return Ok(result);
        }

        [HttpGet("me")]

        public IActionResult Me()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null) return Unauthorized();

            var claims = identity.Claims;
            return Ok(new
            {
                userId = claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value,
                email = claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Email)?.Value,
                fullName = claims.FirstOrDefault(c => c.Type == "fullName")?.Value
            });
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.Password))
                return BadRequest(new { message = "Email và Password là bắt buộc" });

            var user = await _authService.RegisterAsync(dto);
            if (user == null)
                return Conflict(new { message = "Email đã tồn tại" });

            return Ok(new { message = "Đăng ký thành công", userId = user.UserId });
        }
    }
}
