﻿using System;
using System.Collections.Generic;

namespace dotnet_orders.Models;

public partial class ProductTag
{
    public int ProductTagId { get; set; }

    public int ProductId { get; set; }

    public int TagId { get; set; }

    public virtual Product Product { get; set; } = null!;

    public virtual Tag Tag { get; set; } = null!;
}
