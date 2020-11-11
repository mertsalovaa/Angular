using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BeautySalon.DATA_ACCESS.Entities
{
    public class ServiceType
    {
        public ServiceType()
        {
            Services = new List<Service>();
        }

        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        public virtual ICollection<Service> Services { get; set; }

    }
}
