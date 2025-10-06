
using dotnet_orders.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(); // Đảm bảo đã cài NuGet

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

// Sau builder.Build()


var app = builder.Build();

// Enable middleware for Swagger    
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(); // UI sẽ được hiển thị tại /swagger
}
app.UseCors("AllowLovable");
app.UseHttpsRedirection();
app.UseAuthentication(); // phải đặt trước UseAuthorization
app.UseAuthorization();

app.MapControllers();

app.Run();
