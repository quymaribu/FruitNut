public class ProductDto
{
    public int ProductId { get; set; }
    public string Name { get; set; } = "";
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public bool IsActive { get; set; }
    public string? Category { get; set; }
    public string ImageUrl { get; set; } = "";
}
