using Microsoft.AspNetCore.Identity;
using dotnet_orders.Models;

namespace dotnet_orders.Utils
{
    public static class PasswordUtil
    {
        public static string HashPassword(string plain)
        {
            var ph = new PasswordHasher<User>();
            return ph.HashPassword(null!, plain);
        }
    }
}
