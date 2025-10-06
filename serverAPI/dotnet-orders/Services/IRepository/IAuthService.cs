using System.Threading.Tasks;
using dotnet_orders.DTOs;
using dotnet_orders.Models;
using dotnet_orders.Models.Dtos;

namespace dotnet_orders.Services
{
    public interface IAuthService
    {
        Task<AuthResponse?> AuthenticateAsync(LoginRequest request);
        Task<User?> RegisterAsync(RegisterDto dto);
    }
}
