using Microsoft.AspNetCore.Mvc;
using dotnet_orders.Models;

namespace dotnet_orders.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly EcomDbContext _context;

        public ProductsController(EcomDbContext context) => _context = context;

        [HttpGet]
        public IActionResult GetAll()
        {
            var products = _context.Products
                .Select(p => new
                {
                    p.ProductId,
                    p.Name,
                    p.Price,
                    p.Stock,
                    p.IsActive,
                    Category = p.Category != null ? p.Category.Name : null
                })
                .ToList();
            return Ok(products);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetById(int id)
        {
            var product = _context.Products
                .Where(p => p.ProductId == id)
                .Select(p => new
                {
                    p.ProductId,
                    p.Name,
                    p.Price,
                    p.Stock,
                    p.IsActive,
                    Category = p.Category != null ? p.Category.Name : null
                })
                .FirstOrDefault();

            return product == null ? NotFound() : Ok(product);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Product product)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            _context.Products.Add(product);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = product.ProductId }, product);
        }

        [HttpPut("{id:int}")]
        public IActionResult Update(int id, [FromBody] Product updated)
        {
            var product = _context.Products.Find(id);
            if (product == null) return NotFound();

            product.Name = updated.Name;
            product.Price = updated.Price;
            product.Stock = updated.Stock;
            product.IsActive = updated.IsActive;
            product.CategoryId = updated.CategoryId;

            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var product = _context.Products.Find(id);
            if (product == null) return NotFound();

            _context.Products.Remove(product);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
