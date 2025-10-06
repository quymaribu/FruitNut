using System;
using System.Collections.Generic;

namespace dotnet_orders.Models;

public partial class ShippingMethod
{
    public int ShippingMethodId { get; set; }

    public string Name { get; set; } = null!;

    public decimal Price { get; set; }

    public int? TransitDays { get; set; }
}
