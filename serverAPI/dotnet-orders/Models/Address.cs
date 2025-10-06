using System;
using System.Collections.Generic;

namespace dotnet_orders.Models;

public partial class Address
{
    public int AddressId { get; set; }

    public int UserId { get; set; }

    public string? FullName { get; set; }

    public string? Street { get; set; }

    public string? City { get; set; }

    public string? State { get; set; }

    public string? Country { get; set; }

    public string? PostalCode { get; set; }

    public string? Phone { get; set; }

    public bool IsDefault { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual ICollection<Order> OrderBillingAddresses { get; set; } = new List<Order>();

    public virtual ICollection<Order> OrderShippingAddresses { get; set; } = new List<Order>();

    public virtual User User { get; set; } = null!;
}
