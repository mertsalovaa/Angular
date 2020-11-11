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
    public class ProductController : ControllerBase
    {
        private readonly EFContext _context;

        public ProductController(
                EFContext context
            )
        {
            _context = context;
        }

        [HttpGet("all")]
        public List<ProductDTO> getAllProducts()
        {
            return _context.Goods.Select(t => new ProductDTO()
            {
                Id = t.Id,
                Name = t.Name,
                Description = t.Description,
                Price = t.Price,
                Image = t.Image,
                ProductType = t.ProductType.Name
            }).ToList();
        }

        [HttpPost("add")]
        public async Task<ResultDTO> addProduct([FromBody] ProductDTO model)
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
                var product = new Goods()
                {
                    Name = model.Name,
                    Price = model.Price,
                    Image = model.Image,
                    Description = model.Description,
                    ProductType = _context.GoodsTypes.FirstOrDefault(x => x.Name == model.ProductType)
                };

                _context.Goods.Attach(product);
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
        public async Task<ResultDTO> deleteProduct([FromQuery] int id)
        {
            try
            {
                _context.Goods.Remove(_context.Goods.FirstOrDefault(x => x.Id == id));
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
        public async Task<ResultDTO> updateService([FromBody] ProductDTO model)
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

                var product = _context.Goods.FirstOrDefault(x => x.Id == model.Id);

                product.Name = model.Name;
                product.Image = model.Image;
                product.Price = model.Price;
                product.Description = model.Description;
                product.ProductType = _context.GoodsTypes.FirstOrDefault(x => x.Name == model.ProductType);

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
        public ProductDTO getById([FromQuery] int id)
        {
            var product = _context.Goods.FirstOrDefault(x => x.Id == id);
            var type = _context.GoodsTypes.FirstOrDefault(x => x.Id == product.ProductId).Name;
            var newProduct = new ProductDTO()
            {
                Id = product.Id,
                Name = product.Name,
                Price = product.Price,
                Image = product.Image,
                Description = product.Description,
                ProductType = type
            };
            return newProduct;
        }

        [HttpGet("types")]
        public List<string> getAllType()
        {
            return _context.GoodsTypes.Select(t => t.Name).ToList();
        }

        [HttpGet("get-by-name")]
        public ProductDTO getProductByName([FromQuery] string name)
        {
            var product = _context.Goods.FirstOrDefault(x => x.Name == name);
            return new ProductDTO()
            {
                Id = product.Id,
                Description = product.Description,
                Image = product.Image,
                Name = product.Name,
                Price = product.Price,
                ProductType = _context.GoodsTypes.FirstOrDefault(x => x.Id == product.ProductId).Name
            };
        }

    }
}
