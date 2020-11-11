using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BeautySalon.DATA_ACCESS.Entities
{
    public class User : IdentityUser
    {
        [Required]
        [MaxLength(30)]        
        public string FullName { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime BirthDate { get; set; }

        [Required]
        public string Image { get; set; }

        [Required]
        public string Address { get; set; }
    
    }
}