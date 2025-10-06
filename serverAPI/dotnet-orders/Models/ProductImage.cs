using System;
using System.Collections.Generic;

namespace dotnet_orders.Models;

public partial class ProductImage
{
    public int ImageId { get; set; }

    public int ProductId { get; set; }

    public string Url { get; set; } = null!;

    public bool IsPrimary { get; set; }

    public int SortOrder { get; set; }

    public virtual Product Product { get; set; } = null!;
}
