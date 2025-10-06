using Microsoft.AspNetCore.Mvc;
using dotnet_orders.Models;

namespace dotnet_orders.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressesController : ControllerBase
    {
        private readonly EcomDbContext _context;

        public AddressesController(EcomDbContext context) => _context = context;

        [HttpGet]
        public IActionResult GetAll() => Ok(_context.Addresses.ToList());

        [HttpGet("{id:int}")]
        public IActionResult GetById(int id)
        {
            var a = _context.Addresses.Find(id);
            return a == null ? NotFound() : Ok(a);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Address a)
        {
            _context.Addresses.Add(a);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = a.AddressId }, a);
        }

        [HttpPut("{id:int}")]
        public IActionResult Update(int id, [FromBody] Address updated)
        {
            var a = _context.Addresses.Find(id);
            if (a == null) return NotFound();

            a.Street = updated.Street;
            a.City = updated.City;
            a.Country = updated.Country;
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var a = _context.Addresses.Find(id);
            if (a == null) return NotFound();

            _context.Addresses.Remove(a);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
