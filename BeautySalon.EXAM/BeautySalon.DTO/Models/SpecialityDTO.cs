using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BeautySalon.DTO.Models
{
    public class SpecialityDTO
    {
        [Required(ErrorMessage = "Specialities name is required")]
        public string Name { get; set; }
    }
}
