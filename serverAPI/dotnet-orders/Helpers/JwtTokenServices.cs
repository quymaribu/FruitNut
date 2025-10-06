using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using dotnet_orders.Models;

namespace dotnet_orders.Helpers
{
    public class JwtTokenResult
    {
        public string Token { get; set; } = null!;
        public DateTime ExpiresAt { get; set; }
    }

    public class JwtTokenService
    {
        private readonly JwtSettings _settings;
        private readonly byte[] _key;

        public JwtTokenService(IOptions<JwtSettings> options)
        {
            _settings = options.Value;
            _key = Encoding.UTF8.GetBytes(_settings.Secret);
        }

        public JwtTokenResult GenerateToken(User user, IEnumerable<string> roles)
        {
            var now = DateTime.UtcNow;
            var expires = now.AddMinutes(_settings.ExpiryMinutes);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserId.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email ?? ""),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            foreach (var r in roles)
            {
                if (!string.IsNullOrWhiteSpace(r))
                    claims.Add(new Claim(ClaimTypes.Role, r));
            }

            var creds = new SigningCredentials(new SymmetricSecurityKey(_key), SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _settings.Issuer,
                audience: _settings.Audience,
                claims: claims,
                notBefore: now,
                expires: expires,
                signingCredentials: creds
            );

            var tokenStr = new JwtSecurityTokenHandler().WriteToken(token);

            return new JwtTokenResult { Token = tokenStr, ExpiresAt = expires };
        }

        public ClaimsPrincipal? ValidateToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(_key),
                    ValidateIssuer = !string.IsNullOrEmpty(_settings.Issuer),
                    ValidIssuer = _settings.Issuer,
                    ValidateAudience = !string.IsNullOrEmpty(_settings.Audience),
                    ValidAudience = _settings.Audience,
                    ClockSkew = TimeSpan.FromMinutes(2)
                };

                var principal = tokenHandler.ValidateToken(token, validationParameters, out var validatedToken);
                return principal;
            }
            catch
            {
                return null;
            }
        }
    }
}
