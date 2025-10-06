using System;
using System.Collections.Generic;

namespace dotnet_orders.Models;

public partial class InventoryTransaction
{
    public int InventoryTransactionId { get; set; }

    public int ProductId { get; set; }

    public int ChangeQty { get; set; }

    public string? Reason { get; set; }

    public DateTime CreatedAt { get; set; }

    public int? ByUserId { get; set; }

    public virtual User? ByUser { get; set; }

    public virtual Product Product { get; set; } = null!;
}
