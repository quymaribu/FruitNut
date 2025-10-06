using Microsoft.AspNetCore.Mvc;
using dotnet_orders.Models;

namespace dotnet_orders.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRolesController : ControllerBase
    {
        private readonly EcomDbContext _context;

        public UserRolesController(EcomDbContext context) => _context = context;

        [HttpGet]
        public IActionResult GetAll() => Ok(_context.UserRoles.ToList());

        [HttpGet("{id:int}")]
        public IActionResult GetById(int id)
        {
            var ur = _context.UserRoles.Find(id);
            return ur == null ? NotFound() : Ok(ur);
        }

        [HttpPost]
        public IActionResult Create([FromBody] UserRole ur)
        {
            _context.UserRoles.Add(ur);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = ur.UserRoleId }, ur);
        }

        [HttpPut("{id:int}")]
        public IActionResult Update(int id, [FromBody] UserRole updated)
        {
            var ur = _context.UserRoles.Find(id);
            if (ur == null) return NotFound();

            ur.RoleId = updated.RoleId;
            ur.UserId = updated.UserId;
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var ur = _context.UserRoles.Find(id);
            if (ur == null) return NotFound();

            _context.UserRoles.Remove(ur);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
