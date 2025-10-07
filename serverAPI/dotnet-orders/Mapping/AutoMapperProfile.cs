using AutoMapper;
using dotnet_orders.DTOs;
using dotnet_orders.Models;

namespace dotnet_orders.Mapping
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<CartItemCreateDto, CartItem>();
        }
    }
}
