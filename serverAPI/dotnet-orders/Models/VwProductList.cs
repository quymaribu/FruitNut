using System;
using System.Collections.Generic;

namespace dotnet_orders.Models;

public partial class VwProductList
{
    public int ProductId { get; set; }

    public string? Sku { get; set; }

    public string Name { get; set; } = null!;

    public string? ShortDescription { get; set; }

    public decimal Price { get; set; }

    public int Stock { get; set; }

    public string? PrimaryImageUrl { get; set; }

    public string? CategoryName { get; set; }
}
