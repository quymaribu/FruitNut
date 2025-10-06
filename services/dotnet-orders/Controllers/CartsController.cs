using Microsoft.AspNetCore.Mvc;
using dotnet_orders.Models;

namespace dotnet_orders.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly EcomDbContext _context;

        public CartsController(EcomDbContext context) => _context = context;

        [HttpGet]
        public IActionResult GetAll() => Ok(_context.Carts.ToList());

        [HttpGet("{id:int}")]
        public IActionResult GetById(int id)
        {
            var c = _context.Carts.Find(id);
            return c == null ? NotFound() : Ok(c);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Cart c)
        {
            _context.Carts.Add(c);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = c.CartId }, c);
        }

        [HttpPut("{id:int}")]
        public IActionResult Update(int id, [FromBody] Cart updated)
        {
            var c = _context.Carts.Find(id);
            if (c == null) return NotFound();

            c.UserId = updated.UserId;
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var c = _context.Carts.Find(id);
            if (c == null) return NotFound();

            _context.Carts.Remove(c);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
