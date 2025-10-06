using Microsoft.AspNetCore.Mvc;
using dotnet_orders.Models;

namespace dotnet_orders.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderItemsController : ControllerBase
    {
        private readonly EcomDbContext _context;

        public OrderItemsController(EcomDbContext context) => _context = context;

        [HttpGet]
        public IActionResult GetAll() => Ok(_context.OrderItems.ToList());

        [HttpGet("{id:int}")]
        public IActionResult GetById(int id)
        {
            var item = _context.OrderItems.Find(id);
            return item == null ? NotFound() : Ok(item);
        }

        [HttpPost]
        public IActionResult Create([FromBody] OrderItem item)
        {
            _context.OrderItems.Add(item);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = item.OrderItemId }, item);
        }

        [HttpPut("{id:int}")]
        public IActionResult Update(int id, [FromBody] OrderItem updated)
        {
            var item = _context.OrderItems.Find(id);
            if (item == null) return NotFound();

            item.Quantity = updated.Quantity;
            item.UnitPrice = updated.UnitPrice;
            item.ProductId = updated.ProductId;
            _context.SaveChanges();
            return NoContent();
        }


        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var item = _context.OrderItems.Find(id);
            if (item == null) return NotFound();

            _context.OrderItems.Remove(item);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
