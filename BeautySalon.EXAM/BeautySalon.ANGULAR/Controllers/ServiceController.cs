using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BeautySalon.DATA_ACCESS;
using BeautySalon.DATA_ACCESS.Entities;
using BeautySalon.DOMAIN.JWT;
using BeautySalon.DOMAIN.Validator;
using BeautySalon.DTO.Models;
using BeautySalon.DTO.Models.Result;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BeautySalon.ANGULAR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceController : ControllerBase
    {
        private readonly EFContext _context;

        public ServiceController(
                EFContext context
            )
        {
            _context = context;
        }

        [HttpGet("all")]
        public List<ServiceDTO> getAllServices()
        {
            return _context.Services.Select(t => new ServiceDTO()
            {
                Id = t.Id,
                Name = t.Name,
                Price = t.Price,
                Date = t.Date,
                ServiceType = t.ServiceType.Name,
                EmployeeName = t.Employee.User.FullName,
                Image = t.Image
            }).ToList();
        }

        [HttpPost("add")]
        public async Task<ResultDTO> addService([FromBody] ServiceDTO model)
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
                var user = _context.Users.FirstOrDefault(x => x.FullName == model.EmployeeName).Id;
                var empl = _context.Employees.FirstOrDefault(x => x.User.Id == user);
                var service = new Service()
                {
                    Name = model.Name,
                    Price = model.Price,
                    Date = model.Date,
                    Image = model.Image,
                    ServiceType = _context.ServiceTypes.FirstOrDefault(x => x.Name == model.ServiceType),
                    Employee = empl
                };

                _context.Services.Attach(service);
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
        public async Task<ResultDTO> deleteService([FromQuery] int id)
        {
            try
            {
                _context.Services.Remove(_context.Services.FirstOrDefault(x => x.Id == id));
                _context.SaveChanges();
                return new ResultDTO()
                {
                    Message = "Ok",
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

        [HttpPost("update")]
        public async Task<ResultDTO> updateService([FromBody] ServiceDTO model)
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

                var service = _context.Services.FirstOrDefault(x => x.Id == model.Id);

                service.Name = model.Name;
                service.Image = model.Image;
                service.Price = model.Price;
                service.ServiceType = _context.ServiceTypes.FirstOrDefault(x => x.Name == model.ServiceType);
                service.Employee = _context.Employees.FirstOrDefault(x => x.User.FullName == model.EmployeeName);

                _context.SaveChanges();

                return new ResultDTO()
                {
                    Message = "Ok",
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

        [HttpGet("get-by-id")]
        public ServiceDTO getById([FromQuery] int id)
        {
            var service = _context.Services.FirstOrDefault(x => x.Id == id);
            var empl = _context.Users.FirstOrDefault(x => x.Id == service.EmployeeId).FullName;
            var type = _context.ServiceTypes.FirstOrDefault(x => x.Id == service.ServiceTypeId).Name;
            var newService = new ServiceDTO()
            {
                Id = service.Id,
                Name = service.Name,
                Price = service.Price,
                Date = service.Date,
                Image = service.Image,
                EmployeeName = empl,
                ServiceType = type
            };
            return newService;
        }

        [HttpGet("types")]
        public List<string> getAllType()
        {
            return _context.ServiceTypes.Select(t => t.Name).ToList();
        }

        [HttpGet("employees")]
        public List<string> getAllEmployee()
        {
            return _context.Employees.Select(t => t.User.FullName).ToList();
        }

        [HttpGet("get-by-employeeEmail")]
        public List<ServiceDTO> getServiceByEmployeeEmail([FromQuery] string email)
        {
            var empl = _context.Users.FirstOrDefault(x => x.Email == email).Id;
            var services = _context.Services.Where(x => x.EmployeeId == empl);
            return services.Select(x => new ServiceDTO()
            {
                Id = x.Id,
                Date = x.Date,
                EmployeeName = _context.Users.FirstOrDefault(u => u.Id == empl).FullName,
                Image = x.Image,
                Name = x.Name,
                Price = x.Price,
                ServiceType = _context.ServiceTypes.FirstOrDefault(t => t.Id == x.ServiceTypeId).Name
            }).ToList();

        }

        [HttpGet("gallery")]
        public List<string> getAllImage()
        {
            var services = _context.Services.Select(x => x.Image);
            var products = _context.Goods.Select(x => x.Image);
            var images = new List<string>();
            foreach (var item in services)
            {
                images.Add(item);
            }
            foreach (var item in products)
            {
                images.Add(item);
            }
            return images;
        }

        [HttpGet("get-by-name")]
        public ServiceDTO getServiceByName([FromQuery] string name)
        {
            var service = _context.Services.FirstOrDefault(x => x.Name == name);
            return new ServiceDTO()
            {
                Id = service.Id,
                Name = service.Name,
                Date = service.Date,
                EmployeeName = _context.Users.FirstOrDefault(x => x.Id == service.EmployeeId).FullName,
                Image = service.Image,
                Price = service.Price,
                ServiceType = _context.ServiceTypes.FirstOrDefault(x => x.Id == service.ServiceTypeId).Name
            };
        }
    }
}
