using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BeautySalon.DATA_ACCESS.Entities
{
    public class GoodsType
    {
        public GoodsType()
        {
            Goods = new List<Goods>();
        }
        
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Goods> Goods { get; set; }
    }
}
