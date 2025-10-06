using Microsoft.AspNetCore.Mvc;
using dotnet_orders.Models;

namespace dotnet_orders.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly EcomDbContext _context;

        public CategoriesController(EcomDbContext context) => _context = context;

        [HttpGet]
        public IActionResult GetAll() => Ok(_context.Categories.ToList());

        [HttpGet("{id:int}")]
        public IActionResult GetById(int id)
        {
            var cat = _context.Categories.Find(id);
            return cat == null ? NotFound() : Ok(cat);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Category cat)
        {
            _context.Categories.Add(cat);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = cat.CategoryId }, cat);
        }

        [HttpPut("{id:int}")]
        public IActionResult Update(int id, [FromBody] Category cat)
        {
            var c = _context.Categories.Find(id);
            if (c == null) return NotFound();

            c.Name = cat.Name;
            c.Slug = cat.Slug;
            c.ParentId = cat.ParentId;
            _context.SaveChanges();
            return NoContent();
        }


        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var c = _context.Categories.Find(id);
            if (c == null) return NotFound();

            _context.Categories.Remove(c);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
