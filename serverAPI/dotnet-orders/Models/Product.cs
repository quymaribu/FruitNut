using System;
using System.Collections.Generic;

namespace dotnet_orders.Models;

public partial class Product
{
    public int ProductId { get; set; }

    public string? Sku { get; set; }

    public string Name { get; set; } = null!;

    public string? ShortDescription { get; set; }

    public string? Description { get; set; }

    public decimal Price { get; set; }

    public decimal? Cost { get; set; }

    public int Stock { get; set; }

    public bool IsActive { get; set; }

    public int? CategoryId { get; set; }

    public DateTime CreatedAt { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();

    public virtual Category? Category { get; set; }

    public virtual ICollection<InventoryTransaction> InventoryTransactions { get; set; } = new List<InventoryTransaction>();

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual ICollection<ProductImage> ProductImages { get; set; } = new List<ProductImage>();

    public virtual ICollection<ProductTag> ProductTags { get; set; } = new List<ProductTag>();
}
