using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BeautySalon.DTO.Models
{
    public class ProductDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Price is required")]
        public float Price { get; set; }

        [Required(ErrorMessage = "Image URL is required")]
        public string Image { get; set; }

        [Required(ErrorMessage = "Description is required")]
        public string Description { get; set; }
        public string ProductType { get; set; }
    }
}
