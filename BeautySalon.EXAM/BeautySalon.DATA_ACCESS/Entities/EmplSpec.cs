using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BeautySalon.DATA_ACCESS.Entities
{
    public class EmplSpec
    {
        [Key]
        public int Id { get; set; }

        public string EmployeeId { get; set; }
        public int? SpecialityId { get; set; }

        [ForeignKey(nameof(SpecialityId))]
        public virtual Speciality Speciality { get; set; }


        [ForeignKey(nameof(EmployeeId))]
        public virtual Employee Employee { get; set; }
    }
}
