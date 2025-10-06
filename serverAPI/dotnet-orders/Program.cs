using dotnet_orders.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using dotnet_orders.Services;
using dotnet_orders.Helpers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// JWT config
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secretKey = jwtSettings["Secret"];
builder.Services.Configure<JwtSettings>(jwtSettings);
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer = jwtSettings["Issuer"],   // Issuer hợp lệ (lấy từ appsettings.json)
            ValidAudience = jwtSettings["Audience"], // Audience hợp lệ
            IssuerSigningKey = new SymmetricSecurityKey(
        Encoding.UTF8.GetBytes(secretKey)  // Khóa bí mật để ký token
    ),

            ClockSkew = TimeSpan.Zero              // Bỏ khoảng lệch mặc định 5 phút
        };

    });

builder.Services.AddAuthorization();

builder.Services.AddDbContext<EcomDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MyCnn")));

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLovable", policy =>
    {
        policy.WithOrigins("http://localhost:8080", "https://*.lovable.app")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<JwtTokenService>();


var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    var swagger = "http://localhost:5213/swagger/index.html";
    try
    {
        System.Diagnostics.Process.Start(new System.Diagnostics.ProcessStartInfo
        {
            FileName = swagger,
            UseShellExecute = true
        });
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex);
    }
}

app.UseCors("AllowLovable");

app.UseHttpsRedirection();

app.UseAuthentication(); // phải đặt trước UseAuthorization
app.UseAuthorization();

app.MapControllers();

app.Run();
