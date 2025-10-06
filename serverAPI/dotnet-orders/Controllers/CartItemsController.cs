using Microsoft.AspNetCore.Mvc;
using dotnet_orders.Models;

namespace dotnet_orders.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartItemsController : ControllerBase
    {
        private readonly EcomDbContext _context;

        public CartItemsController(EcomDbContext context) => _context = context;

        [HttpGet]
        public IActionResult GetAll() => Ok(_context.CartItems.ToList());

        [HttpGet("{id:int}")]
        public IActionResult GetById(int id)
        {
            var ci = _context.CartItems.Find(id);
            return ci == null ? NotFound() : Ok(ci);
        }

        [HttpPost]
        public IActionResult Create([FromBody] CartItem ci)
        {
            _context.CartItems.Add(ci);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = ci.CartItemId }, ci);
        }

        [HttpPut("{id:int}")]
        public IActionResult Update(int id, [FromBody] CartItem updated)
        {
            var ci = _context.CartItems.Find(id);
            if (ci == null) return NotFound();

            ci.ProductId = updated.ProductId;
            ci.Quantity = updated.Quantity;
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var ci = _context.CartItems.Find(id);
            if (ci == null) return NotFound();

            _context.CartItems.Remove(ci);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
