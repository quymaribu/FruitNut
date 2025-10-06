using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dotnet_orders.Models;

namespace dotnet_orders.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly EcomDbContext _context;

        public OrdersController(EcomDbContext context) => _context = context;

        [HttpGet]
        public IActionResult GetAll()
        {
            var orders = _context.Orders
                .Include(o => o.User)
                .Include(o => o.OrderItems)
                .ToList();
            return Ok(orders);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetById(int id)
        {
            var order = _context.Orders
                .Include(o => o.OrderItems)
                .FirstOrDefault(o => o.OrderId == id);

            return order == null ? NotFound() : Ok(order);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Order order)
        {
            _context.Orders.Add(order);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = order.OrderId }, order);
        }

        [HttpPut("{id:int}")]
        public IActionResult Update(int id, [FromBody] Order updated)
        {
            var order = _context.Orders.Find(id);
            if (order == null) return NotFound();

            order.Status = updated.Status;
            order.TotalAmount = updated.TotalAmount;
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var order = _context.Orders.Find(id);
            if (order == null) return NotFound();

            _context.Orders.Remove(order);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
