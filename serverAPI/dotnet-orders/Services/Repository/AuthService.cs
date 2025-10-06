using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using dotnet_orders.Models;
using dotnet_orders.Models.Dtos;
using dotnet_orders.Helpers;
using dotnet_orders.Utils;
using dotnet_orders.DTOs;

namespace dotnet_orders.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepo;
        private readonly EcomDbContext _context;
        private readonly JwtTokenService _jwtService;
        private readonly PasswordHasher<User> _passwordHasher = new();

        public AuthService(IUserRepository userRepo, EcomDbContext db, JwtTokenService jwtService)
        {
            _userRepo = userRepo;
            _context = db;
            _jwtService = jwtService;
        }

        public async Task<AuthResponse?> AuthenticateAsync(LoginRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null) return null;
            if (!user.IsActive) return null;

            var verify = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash ?? "", request.Password);
            if (verify == PasswordVerificationResult.Failed) return null;

            // load roles
            var roles = await _context.UserRoles
                .Where(ur => ur.UserId == user.UserId)
                .Include(ur => ur.Role)
                .Select(ur => ur.Role.RoleName)
                .ToListAsync();

            var token = _jwtService.GenerateToken(user, roles);

            return new AuthResponse
            {
                Token = token.Token,
                ExpiresAt = token.ExpiresAt,
                UserId = user.UserId,
                Email = user.Email,
                Roles = roles
            };
        }
        public async Task<User?> RegisterAsync(RegisterDto dto)
        {
            var exists = await _context.Users.AnyAsync(u => u.Email == dto.Email);
            if (exists) return null;

            var user = new User
            {
                Email = dto.Email,
                PasswordHash = PasswordUtil.HashPassword(dto.Password),
                FullName = dto.FullName,
                Phone = dto.Phone,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // gán role mặc định
            var defaultRole = await _context.Roles.FirstOrDefaultAsync(r => r.RoleId == 2);
            if (defaultRole != null)
            {
                var userRole = new UserRole
                {
                    UserId = user.UserId,
                    RoleId = defaultRole.RoleId,
                    AssignedAt = DateTime.UtcNow
                };
                _context.UserRoles.Add(userRole);
                await _context.SaveChangesAsync();
            }

            return user;
        }
    }
}
