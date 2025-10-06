using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using dotnet_orders.Helpers;
using dotnet_orders.Models;
using dotnet_orders.Services;

namespace dotnet_orders.Middleware
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly JwtTokenService _jwtService;
        private readonly EcomDbContext _db;

        public JwtMiddleware(RequestDelegate next, JwtTokenService jwtService, EcomDbContext db)
        {
            _next = next;
            _jwtService = jwtService;
            _db = db;
        }

        public async Task Invoke(HttpContext context)
        {
            var authHeader = context.Request.Headers["Authorization"].FirstOrDefault();
            if (!string.IsNullOrEmpty(authHeader) && authHeader.StartsWith("Bearer "))
            {
                var token = authHeader.Substring("Bearer ".Length).Trim();
                var principal = _jwtService.ValidateToken(token);
                if (principal != null)
                {
                    var sub = principal.Claims.FirstOrDefault(c => c.Type == System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Sub)?.Value;
                    if (int.TryParse(sub, out var userId))
                    {
                        var user = await _db.Users.FindAsync(userId);
                        // attach user to context (so controllers can read)
                        context.Items["User"] = user;
                    }
                }
            }

            await _next(context);
        }
    }
}
