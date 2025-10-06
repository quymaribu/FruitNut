using System;
using System.Collections.Generic;

namespace dotnet_orders.Models;

public partial class AuditLog
{
    public int AuditId { get; set; }

    public string Entity { get; set; } = null!;

    public string? EntityId { get; set; }

    public string Action { get; set; } = null!;

    public string? Changes { get; set; }

    public DateTime PerformedAt { get; set; }

    public int? PerformedBy { get; set; }
}
