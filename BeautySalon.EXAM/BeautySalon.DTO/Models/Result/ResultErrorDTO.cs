using System;
using System.Collections.Generic;
using System.Text;

namespace BeautySalon.DTO.Models.Result
{
    public class ResultErrorDTO : ResultDTO
    {
        public List<string> Errors { get; set; }
    }
}
