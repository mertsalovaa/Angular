using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BeautySalon.DTO.Models
{
    public class ServiceDTO
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Price is required")]
        public int Price { get; set; }

        [Required(ErrorMessage = "Date is required")]
        [DataType(DataType.Date)]
        public DateTime Date { get; set; }

        public string Image { get; set; }

        [Required(ErrorMessage = "Employee name is required")]
        public string EmployeeName { get; set; }

        //[Required(ErrorMessage = "Employee speciality is required")]
        //public string EmployeeSpeciality { get; set; }

        [Required(ErrorMessage = "Type is required")]
        public string ServiceType { get; set; }
    }
}
