using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dotnet_orders.Models;

namespace dotnet_orders.Services
{
    public class UserRepository : IUserRepository
    {
        private readonly EcomDbContext _db;
        public UserRepository(EcomDbContext db)
        {
            _db = db;
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _db.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            return await _db.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.UserId == id);
        }
    }
}
