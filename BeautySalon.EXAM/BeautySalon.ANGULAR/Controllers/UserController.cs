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
    public class UserController : ControllerBase
    {
        private readonly EFContext _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IJWTTokenServices _jwtTokenService;

        public UserController(
                EFContext context,
                UserManager<User> userManager,
                SignInManager<User> signInManager,
                IJWTTokenServices jwtTokenService
            )
        {
            _context = context;
            _userManager = userManager;
            _jwtTokenService = jwtTokenService;
            _signInManager = signInManager;
        }

        //"email": "newEmployee@gmail.com",
        //"password": "Qwerty1--",
        //"phone": "1234567890",
        //"fullname": "Iryna Mertsalova",
        //"address": "Rivne",
        //"birthdate": "2004-03-10",
        //"image": "https://docs.microsoft.com/ru-ru/windows/uwp/design/controls-and-patterns/images/image_licorice.jpg",
        //"specialities" : "hair styler"

        [HttpGet("speciality")]
        public List<string> getAllSpecialities()
        {
            return _context.Specialities.Select(t => t.Name).ToList();
        }

        //localhost:12312/api/User/register
        [HttpPost("register-employee")]
        public async Task<ResultDTO> Register([FromBody] EmployeeRegister model)
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

                var user = new User()
                {
                    UserName = model.Email,
                    Email = model.Email,
                    PhoneNumber = model.Phone,
                    FullName = model.FullName,
                    BirthDate = model.BirthDate,
                    Image = model.Image,
                    Address = model.Address
                };

                var employee = new Employee()
                {
                    Id = user.Id,
                    User = user
                };
                _context.EmplSpecs.Add(
                    new EmplSpec()
                    {
                        Employee = employee,
                        Speciality = _context.Specialities.FirstOrDefault(x => x.Name == model.Specialities)
                    });

                IdentityResult result = await _userManager.CreateAsync(user, model.Password);
                result = await _userManager.AddToRoleAsync(user, "Employee");

                if (result.Succeeded)
                {
                    result = _userManager.AddToRoleAsync(user, "Employee").Result;
                    _context.Employees.Attach(employee);
                    _context.SaveChanges();

                    return new ResultDTO()
                    {
                        Message = "OK",
                        Status = 200
                    };
                }
                else
                {
                    return new ResultErrorDTO()
                    {
                        Message = "ERROR",
                        Status = 403,
                        Errors = CustomValidator.getErrorsByIdentityResult(result)
                    };
                }
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

        [HttpPost("register-customer")]
        public async Task<ResultDTO> RegisterCustom([FromBody] CustomerRegister model)
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

                var user = new User()
                {
                    UserName = model.Email,
                    Email = model.Email,
                    PhoneNumber = model.Phone,
                    FullName = model.FullName,
                    BirthDate = model.BirthDate,
                    Image = model.Image,
                    Address = model.Address
                };

                var customer = new Customer()
                {
                    Id = user.Id,
                    UserId = user.Id,
                    User = user
                };

                IdentityResult result = await _userManager.CreateAsync(user, model.Password);
                result = await _userManager.AddToRoleAsync(user, "Customer");

                if (result.Succeeded)
                {
                    result = _userManager.AddToRoleAsync(user, "Customer").Result;
                    _context.Customers.Add(customer);
                    _context.SaveChanges();

                    return new ResultDTO()
                    {
                        Message = "OK",
                        Status = 200
                    };
                }
                else
                {
                    return new ResultErrorDTO()
                    {
                        Message = "ERROR",
                        Status = 403,
                        Errors = CustomValidator.getErrorsByIdentityResult(result)
                    };
                }
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

        //localhost:12312/api/User/login
        [HttpPost("login")]
        public async Task<ResultDTO> Login([FromBody] LoginDTO model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return new ResultErrorDTO
                    {
                        Message = "ERROR",
                        Status = 401,
                        Errors = CustomValidator.getErrorsByModel(ModelState)
                    };
                }

                var result = _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false).Result;

                if (!result.Succeeded)
                {
                    return new ResultErrorDTO
                    {
                        Status = 403,
                        Message = "ERROR",
                        Errors = new List<string> { "Incorrect email or password" }
                    };
                }
                else
                {
                    var user = await _userManager.FindByEmailAsync(model.Email);
                    await _signInManager.SignInAsync(user, false);


                    return new ResultLoginDTO
                    {
                        Status = 200,
                        Message = "OK",
                        Token = _jwtTokenService.CreateToken(user)
                    };
                }
            }
            catch (Exception e)
            {
                return new ResultErrorDTO
                {
                    Status = 500,
                    Message = "ERROR",
                    Errors = new List<string> { e.Message }
                };
            }
        }

        [HttpGet("delete-employee")]
        public async Task<ResultDTO> deleteEmployee([FromQuery] string id)
        {
            try
            {
                _context.EmplSpecs.Remove(_context.EmplSpecs.FirstOrDefault(x => x.EmployeeId == id));
                _context.Employees.Remove(_context.Employees.FirstOrDefault(x => x.Id == id));
                _context.Users.Remove(_context.Users.FirstOrDefault(x => x.Id == id));
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

        [HttpGet("get-user-image")]
        public string getUserImage([FromQuery] string email)
        {
            var image = _context.Users.FirstOrDefault(x => x.Email == email).Image;
            return image;
        }

        [HttpGet("owner")]
        public CustomerRegister getOwner()
        {
            var userId = _context.UserRoles.FirstOrDefault(x => x.RoleId == "b1153c0e-055a-468e-a50c-e60ddf64c1e7").UserId;
            var user = _context.Users.FirstOrDefault(x => x.Id == userId);
            return new CustomerRegister()
            {
                Address = user.Address,
                BirthDate = user.BirthDate,
                Email = user.Email,
                FullName = user.FullName,
                Image = user.Image,
                Password = user.PasswordHash,
                Phone = user.PhoneNumber

            };
        }

        [HttpGet("main-manager")]
        public CustomerRegister getMainManager()
        {
            var userId = _context.UserRoles.FirstOrDefault(x => x.RoleId == "5b95d2ee-5596-4ddb-9ca3-5d8eda663b3f").UserId;
            var user = _context.Users.FirstOrDefault(x => x.Id == userId);
            return new CustomerRegister()
            {
                Address = user.Address,
                BirthDate = user.BirthDate,
                Email = user.Email,
                FullName = user.FullName,
                Image = user.Image,
                Password = user.PasswordHash,
                Phone = user.PhoneNumber
            };
        }

        [HttpGet("employees")]
        public IQueryable<EmployeeRegister> getAllEmployees()
        {
            return _context.Employees.Select(t => new EmployeeRegister()
            {
                Id = t.Id,
                Address = t.User.Address,
                BirthDate = t.User.BirthDate,
                FullName = t.User.FullName,
                Email = t.User.Email,
                Image = t.User.Image,
                Password = t.User.PasswordHash,
                Phone = t.User.PhoneNumber,
                Specialities = _context.EmplSpecs.FirstOrDefault(x => x.EmployeeId == t.Id).Speciality.Name
            });
        }

        [HttpGet("get-empl-by-id")]
        public EmployeeRegister getEmployeeById([FromQuery] string id)
        {
            var empl = _context.Users.FirstOrDefault(x => x.Id == id);
            var specName = _context.Specialities.FirstOrDefault(x => x.Id == _context.EmplSpecs.FirstOrDefault(x => x.EmployeeId == id).SpecialityId).Name;
            var newEmpl = new EmployeeRegister()
            {
                Id = empl.Id,
                FullName = empl.FullName,
                Address = empl.Address,
                BirthDate = empl.BirthDate,
                Email = empl.Email,
                Image = empl.Image,
                Password = empl.PasswordHash,
                Phone = empl.PhoneNumber,
                Specialities = specName
            };
            return newEmpl;
        }

        [HttpGet("get-customer-by-email")]
        public CustomerRegister getCustomerByEmail([FromQuery] string email)
        {
            var customer = _context.Users.FirstOrDefault(x => x.Email == email);
            var newCustomer = new CustomerRegister()
            {
                Id = customer.Id,
                FullName = customer.FullName,
                BirthDate = customer.BirthDate,
                Address = customer.Address,
                Email = customer.Email,
                Image = customer.Image,
                Password = customer.PasswordHash,
                Phone = customer.PhoneNumber
            };
            return newCustomer;
        }

        [HttpPost("edit-employee")]
        public async Task<ResultDTO> editEmployee(EmployeeRegister model)
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

                var empl = _context.Users.FirstOrDefault(x => x.Id == model.Id);
                var emplSpec = _context.EmplSpecs.FirstOrDefault(x => x.EmployeeId == model.Id);
                empl.FullName = model.FullName;
                empl.Address = model.Address;
                empl.Email = model.Email;
                empl.BirthDate = model.BirthDate;
                empl.Image = model.Image;
                empl.PhoneNumber = model.Phone;
                emplSpec.SpecialityId = _context.Specialities.FirstOrDefault(x => x.Name == model.Specialities).Id;


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


        [HttpGet("get-order-service-by-empl-email")]
        public List<OrderBeautyService> getOrderServiceByEmplName([FromQuery] string emplEmail)
        {
            var empl = _context.Users.FirstOrDefault(x => x.Email == emplEmail);
            var orders = _context.OrderService.Where(x => x.Service.EmployeeId == empl.Id).ToList();

            OrderBeautyService order = new OrderBeautyService();
            List<OrderBeautyService> newService = new List<OrderBeautyService>();
            Service service = new Service();

            foreach (var item in orders)
            {
                service = _context.Services.FirstOrDefault(x => x.Id == item.ServiceId);
                order = new OrderBeautyService()
                {
                    Id = item.ServiceId,
                    Name = service.Name,
                    Date = service.Date,
                    Image = service.Image,
                    Price = service.Price,
                    EmployeeName = _context.Users.FirstOrDefault(x => x.Id == service.EmployeeId).FullName,
                    ServiceType = _context.ServiceTypes.FirstOrDefault(x => x.Id == service.ServiceTypeId).Name,
                    CustomerName = _context.Users.FirstOrDefault(x => x.Id == item.CustomerId).FullName
                };
                newService.Add(order);
            }
            return newService;
        }

        [HttpGet("get-user-by-email")]
        public CustomerRegister getUserByEmail([FromQuery] string email)
        {
            var user = _context.Users.FirstOrDefault(x => x.Email == email);
            return new CustomerRegister()
            {
                Id = user.Id,
                FullName = user.FullName,
                Image = user.Image,
                Address = user.Address,
                BirthDate = user.BirthDate,
                Email = user.Email,
                Password = user.PasswordHash,
                Phone = user.PhoneNumber
            };
        }
    }
}