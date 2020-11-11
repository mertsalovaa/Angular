using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BeautySalon.DTO.Models
{
    public class ServiceTypeDTO
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Service type name is required")]
        public string Name { get; set; }
    }
}
