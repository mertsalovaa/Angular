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
    public class OrderServiceController : ControllerBase
    {
        private readonly EFContext _context;

        public OrderServiceController(
                EFContext context
            )
        {
            _context = context;
        }

        [HttpGet("all")]
        public List<OrderServiceDTO> getAllOrders([FromQuery] string name)
        {
            var customer = _context.Customers.FirstOrDefault(x => x.User.FullName == name);
            var orders = _context.OrderService.Where(x => x.CustomerId == customer.Id).ToList();
            List<OrderServiceDTO> newOrders = new List<OrderServiceDTO>();
            foreach (var item in orders)
            {
                newOrders.Add(new OrderServiceDTO()
                {
                    Id = item.Id,
                    CustomerName = _context.Users.FirstOrDefault(x => x.Id == customer.Id).FullName,
                    ServiceName = _context.Services.FirstOrDefault(x => x.Id == item.ServiceId).Name
                });
            }

            return newOrders;
        }

        [HttpPost("add")]
        public async Task<ResultDTO> addOrder(OrderServiceDTO model)
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
                OrderService order;
                if (_context.Customers.FirstOrDefault(x => x.Id == customer.Id) == null)
                {
                    //_context.Customers.Attach(new Customer()
                    //{
                    //    Id = customer.Id,
                    //    User = customer,
                    //    UserId = customer.Id
                    //});
                    _context.SaveChanges();

                    //order = new OrderService()
                    //{
                    //    Customer = _context.Customers.FirstOrDefault(x => x.User.FullName == model.CustomerName),
                    //    Service = _context.Services.FirstOrDefault(x => x.Name == model.ServiceName)
                    //};
                }
                order = new OrderService()
                {
                    Customer = _context.Customers.FirstOrDefault(x => x.User.FullName == model.CustomerName),
                    Service = _context.Services.FirstOrDefault(x => x.Name == model.ServiceName),
                    CustomerId = _context.Customers.FirstOrDefault(x => x.User.FullName == model.CustomerName).UserId,
                    ServiceId = _context.Services.FirstOrDefault(x => x.Name == model.ServiceName).Id
                };

                _context.OrderService.Attach(order);
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
                var order = _context.OrderService.FirstOrDefault(x => x.Id == id);
                _context.OrderService.Remove(order);
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
