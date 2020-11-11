using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BeautySalon.DTO.Models
{
    public class EmployeeRegister : CustomerRegister
    {     
        [Required(ErrorMessage = "Specialities is required")]
        public string Specialities { get; set; }
    }
}
