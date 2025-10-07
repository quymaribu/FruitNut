using Microsoft.AspNetCore.Mvc;
using dotnet_orders.DTOs;
using System.Text.Json;
using dotnet_orders.Models;

namespace dotnet_orders.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartItemsController : ControllerBase
    {
        private const string SessionCartKey = "CartItems";

        private readonly EcomDbContext _context;

        public CartItemsController(EcomDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var cart = GetCartFromSession();

            var cartWithProducts = cart.Select(item =>
            {
                var product = _context.Products
                    .Where(p => p.ProductId == item.ProductId)
                    .Select(p => new ProductDto
                    {
                        ProductId = p.ProductId,
                        Name = p.Name,
                        Price = p.Price,
                        Stock = p.Stock,
                        IsActive = p.IsActive,
                        Category = p.Category != null ? p.Category.Name : null,
                        ImageUrl = p.ImageUrl ?? ""
                    })
                    .FirstOrDefault();

                return new CartItemDto
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    UnitPrice = item.UnitPrice,
                    Product = product
                };
            }).ToList();

            return Ok(cartWithProducts);
        }




        // ✅ Thêm sản phẩm vào giỏ
        [HttpPost]
        public IActionResult AddItem([FromBody] CartItemCreateDto newItem)
        {
            if (newItem == null)
                return BadRequest("Invalid item data");

            var cart = GetCartFromSession();

            var existingItem = cart.FirstOrDefault(x => x.ProductId == newItem.ProductId);
            if (existingItem != null)
            {
                existingItem.Quantity += newItem.Quantity;
            }
            else
            {
                cart.Add(new CartItemCreateDto
                {
                    ProductId = newItem.ProductId,
                    Quantity = newItem.Quantity,
                    UnitPrice = newItem.UnitPrice
                });
            }

            SaveCartToSession(cart);
            return Ok(cart);
        }

        // ✅ Cập nhật sản phẩm trong giỏ
        [HttpPut("{productId:int}")]
        public IActionResult Update(int productId, [FromBody] CartItemCreateDto updateDto)
        {
            var cart = GetCartFromSession();

            var item = cart.FirstOrDefault(x => x.ProductId == productId);
            if (item == null)
                return NotFound();

            item.Quantity = updateDto.Quantity;
            item.UnitPrice = updateDto.UnitPrice;

            SaveCartToSession(cart);
            return Ok(cart);
        }

        // ✅ Xóa sản phẩm cụ thể
        [HttpDelete("{productId:int}")]
        public IActionResult Delete(int productId)
        {
            var cart = GetCartFromSession();
            var item = cart.FirstOrDefault(x => x.ProductId == productId);
            if (item == null)
                return NotFound();

            cart.Remove(item);
            SaveCartToSession(cart);

            return Ok(cart);
        }

        // ✅ Xóa toàn bộ giỏ hàng
        [HttpDelete("clear")]
        public IActionResult ClearCart()
        {
            SaveCartToSession(new List<CartItemCreateDto>());
            return Ok(new List<CartItemCreateDto>());
        }

        // 🔧 Lấy giỏ hàng từ session
        private List<CartItemCreateDto> GetCartFromSession()
        {
            var cartJson = HttpContext.Session.GetString(SessionCartKey);
            return string.IsNullOrEmpty(cartJson)
                ? new List<CartItemCreateDto>()
                : JsonSerializer.Deserialize<List<CartItemCreateDto>>(cartJson) ?? new List<CartItemCreateDto>();
        }

        // 🔧 Lưu giỏ hàng vào session
        private void SaveCartToSession(List<CartItemCreateDto> cart)
        {
            var cartJson = JsonSerializer.Serialize(cart);
            HttpContext.Session.SetString(SessionCartKey, cartJson);
        }
    }
}
