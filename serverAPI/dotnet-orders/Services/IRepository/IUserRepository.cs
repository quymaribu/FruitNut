using System.Threading.Tasks;
using dotnet_orders.Models;

namespace dotnet_orders.Services
{
    public interface IUserRepository
    {
        Task<User?> GetByEmailAsync(string email);
        Task<User?> GetByIdAsync(int id);
    }
}
