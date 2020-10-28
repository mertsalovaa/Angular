using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Base_Project817.DataAccess;
using Base_Project817.DataAccess.Entity;
using Base_Project817.DTO.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Base_Project817.Api___Angular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly EFContext _context;

        public ProductController(EFContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public List<ProductDTO> getAllProduct()
        {
            return _context.Products.Select(t => new ProductDTO
            {
                id = t.Id,
                description = t.Description,
                image = t.Image,
                price = t.Price,
                title = t.Title
            }).ToList();
        }

        //[Authorize]
        [HttpPost]
        public void addProduct(ProductDTO product)
        {
            _context.Products.Attach(new Product
            {
                Id = product.id,
                Title = product.title,
                Price = product.price,
                Description = product.description,1
                Image = product.image
            });
            _context.SaveChanges();
        }

        [HttpDelete]
        public void deleteProduct(int id)
        {
            var del = _context.Products.FirstOrDefault(x => x.Id == id);
            _context.Remove(del);
            _context.SaveChanges();
        }
    }
}
