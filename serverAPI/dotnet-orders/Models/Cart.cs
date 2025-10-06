using System;
using System.Collections.Generic;

namespace dotnet_orders.Models;

public partial class Cart
{
    public Guid CartId { get; set; }

    public int? UserId { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
}
