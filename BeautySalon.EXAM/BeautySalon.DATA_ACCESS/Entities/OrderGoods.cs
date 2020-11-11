using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BeautySalon.DATA_ACCESS.Entities
{
    public class OrderGoods
    {
        [Key]
        public int Id { get; set; }
        public string CustomerId { get; set; }
        [ForeignKey(nameof(CustomerId))]
        public virtual Customer Customer { get; set; }

        public int? GoodsId { get; set; }
        [ForeignKey(nameof(GoodsId))]
        public virtual Goods Goods { get; set; }

    }
}
