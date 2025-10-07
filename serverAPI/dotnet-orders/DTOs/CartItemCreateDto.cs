namespace dotnet_orders.DTOs
{
    public class CartItemCreateDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public ProductDto? Product { get; set; }
    }
}
