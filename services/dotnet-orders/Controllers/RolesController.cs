using Microsoft.AspNetCore.Mvc;
using dotnet_orders.Models;

namespace dotnet_orders.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly EcomDbContext _context;

        public RolesController(EcomDbContext context) => _context = context;

        [HttpGet]
        public IActionResult GetAll() => Ok(_context.Roles.ToList());

        [HttpGet("{id:int}")]
        public IActionResult GetById(int id)
        {
            var r = _context.Roles.Find(id);
            return r == null ? NotFound() : Ok(r);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Role r)
        {
            _context.Roles.Add(r);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = r.RoleId }, r);
        }

        [HttpPut("{id:int}")]
        public IActionResult Update(int id, [FromBody] Role updated)
        {
            var r = _context.Roles.Find(id);
            if (r == null) return NotFound();

            r.RoleName = updated.RoleName;
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var r = _context.Roles.Find(id);
            if (r == null) return NotFound();

            _context.Roles.Remove(r);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
