using System;
using System.Collections.Generic;

namespace dotnet_orders.Models;

public partial class Order
{
    public int OrderId { get; set; }

    public string OrderNumber { get; set; } = null!;

    public int? UserId { get; set; }

    public decimal TotalAmount { get; set; }

    public decimal ShippingAmount { get; set; }

    public string Status { get; set; } = null!;

    public int? BillingAddressId { get; set; }

    public int? ShippingAddressId { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual Address? BillingAddress { get; set; }

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual Address? ShippingAddress { get; set; }

    public virtual User? User { get; set; }
}
