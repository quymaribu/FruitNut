using Microsoft.AspNetCore.Mvc;
using dotnet_orders.Models;

namespace dotnet_orders.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly EcomDbContext _context;

        public UsersController(EcomDbContext context) => _context = context;

        // GET: api/users
        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _context.Users.ToList();
            return Ok(users);
        }

        // GET: api/users/5
        [HttpGet("{id:int}")]
        public IActionResult GetById(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null) return NotFound();
            return Ok(user);
        }

        // POST: api/users
        [HttpPost]
        public IActionResult Create([FromBody] User user)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            _context.Users.Add(user);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = user.UserId }, user);
        }

        // PUT: api/users/5
        [HttpPut("{id:int}")]
        public IActionResult Update(int id, [FromBody] User updated)
        {
            var user = _context.Users.Find(id);
            if (user == null) return NotFound();

            user.FullName = updated.FullName;
            user.Email = updated.Email;
            user.Phone = updated.Phone;
            user.PasswordHash = updated.PasswordHash;
            user.IsActive = updated.IsActive;

            _context.SaveChanges();
            return NoContent();
        }

        // DELETE: api/users/5
        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null) return NotFound();

            _context.Users.Remove(user);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
