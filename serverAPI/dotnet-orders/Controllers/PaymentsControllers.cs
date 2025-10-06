using Microsoft.AspNetCore.Mvc;
using dotnet_orders.Models;

namespace dotnet_orders.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly EcomDbContext _context;

        public PaymentsController(EcomDbContext context) => _context = context;

        [HttpGet]
        public IActionResult GetAll() => Ok(_context.Payments.ToList());

        [HttpGet("{id:int}")]
        public IActionResult GetById(int id)
        {
            var p = _context.Payments.Find(id);
            return p == null ? NotFound() : Ok(p);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Payment p)
        {
            _context.Payments.Add(p);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = p.PaymentId }, p);
        }

        [HttpPut("{id:int}")]
        public IActionResult Update(int id, [FromBody] Payment updated)
        {
            var p = _context.Payments.Find(id);
            if (p == null) return NotFound();

            p.Amount = updated.Amount;
            p.Provider = updated.Provider;
            p.TransactionId = updated.TransactionId;
            p.Status = updated.Status;
            p.ProcessedAt = updated.ProcessedAt;
            _context.SaveChanges();
            return NoContent();
        }


        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var p = _context.Payments.Find(id);
            if (p == null) return NotFound();

            _context.Payments.Remove(p);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
