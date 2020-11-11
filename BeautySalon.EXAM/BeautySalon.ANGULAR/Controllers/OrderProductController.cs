using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BeautySalon.DATA_ACCESS;
using BeautySalon.DATA_ACCESS.Entities;
using BeautySalon.DOMAIN.Validator;
using BeautySalon.DTO.Models;
using BeautySalon.DTO.Models.Result;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BeautySalon.ANGULAR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderProductController : ControllerBase
    {
        private readonly EFContext _context;

        public OrderProductController(
                EFContext context
            )
        {
            _context = context;
        }

        [HttpGet("all")]
        public List<OrderProductDTO> getAllOrders([FromQuery] string name)
        {
            var customer = _context.Users.FirstOrDefault(x => x.FullName == name);
            var orders = _context.OrderGoods.Where(x => x.CustomerId == customer.Id).ToList();
            List<OrderProductDTO> newOrders = new List<OrderProductDTO>();
            foreach (var item in orders)
            {
                newOrders.Add(new OrderProductDTO()
                {
                    Id = item.Id,
                    CustomerName = _context.Users.FirstOrDefault(x => x.Id == customer.Id).FullName,
                    ProductName = _context.Goods.FirstOrDefault(x => x.Id == item.GoodsId).Name
                });
            }

            return newOrders;
        }

        [HttpGet("info-all")]
        public List<OrderBeautyProduct> getAllProductOrders()
        {
            var orders = _context.OrderGoods.ToList();
            List<OrderBeautyProduct> products = new List<OrderBeautyProduct>();
            foreach (var item in orders)
            {
                var product = _context.Goods.FirstOrDefault(x => x.Id == item.GoodsId);
                var customer = _context.Users.FirstOrDefault(x => x.Id == item.CustomerId);
                products.Add(new OrderBeautyProduct()
                {
                    Id = product.Id,
                    Name = product.Name,
                    Description = product.Description,
                    Image = product.Image,
                    Price = product.Price,
                    ProductType = _context.GoodsTypes.FirstOrDefault(x => x.Id == product.ProductId).Name,
                    CustomerName = customer.FullName
                });
            }
            return products;
        }


        [HttpPost("add")]
        public async Task<ResultDTO> addOrder(OrderProductDTO model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return new ResultErrorDTO()
                    {
                        Status = 401,
                        Message = "ERROR",
                        Errors = CustomValidator.getErrorsByModel(ModelState)
                    };
                }

                var customer = _context.Users.FirstOrDefault(x => x.FullName == model.CustomerName);
                OrderGoods order;
                if (_context.Customers.FirstOrDefault(x => x.Id == customer.Id) == null)
                {
                    var newCustomer = new Customer()
                    {
                        Id = customer.Id,
                        User = customer,
                        UserId = customer.Id
                    };
                    _context.Customers.Attach(newCustomer);
                    _context.SaveChanges();

                    //order = new OrderService()
                    //{
                    //    Customer = _context.Customers.FirstOrDefault(x => x.User.FullName == model.CustomerName),
                    //    Service = _context.Services.FirstOrDefault(x => x.Name == model.ServiceName)
                    //};
                }
                order = new OrderGoods()
                {
                    Customer = _context.Customers.FirstOrDefault(x => x.User.FullName == model.CustomerName),
                    Goods = _context.Goods.FirstOrDefault(x => x.Name == model.ProductName),
                    CustomerId = _context.Customers.FirstOrDefault(x => x.User.FullName == model.CustomerName).UserId,
                    GoodsId = _context.Goods.FirstOrDefault(x => x.Name == model.ProductName).Id
                };

                _context.OrderGoods.Add(order);
                _context.SaveChanges();


                return new ResultDTO()
                {
                    Message = "OK",
                    Status = 200
                };
            }
            catch (Exception e)
            {
                return new ResultErrorDTO
                {
                    Status = 500,
                    Message = e.Message,
                    Errors = new List<string>()
                    {
                        e.Message
                    }
                };
            }
        }

        [HttpGet("delete")]
        public async Task<ResultDTO> deleteOrder([FromQuery] int id)
        {
            try
            {
                var order = _context.OrderGoods.FirstOrDefault(x => x.Id == id);
                _context.OrderGoods.Remove(order);
                _context.SaveChanges();


                return new ResultDTO()
                {
                    Message = "OK",
                    Status = 200
                };
            }
            catch (Exception e)
            {
                return new ResultErrorDTO
                {
                    Status = 500,
                    Message = e.Message,
                    Errors = new List<string>()
                    {
                        e.Message
                    }
                };
            }
        }
    }
}
