using System;
using System.Collections.Generic;

namespace dotnet_orders.Models.Dtos
{
    public class AuthResponse
    {
        public string Token { get; set; }
        public DateTime ExpiresAt { get; set; }
        public int UserId { get; set; }
        public string Email { get; set; }
        public IEnumerable<string> Roles { get; set; }
    }
}
