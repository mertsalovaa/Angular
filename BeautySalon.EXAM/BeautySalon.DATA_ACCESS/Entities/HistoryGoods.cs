using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BeautySalon.DATA_ACCESS.Entities
{
    public class HistoryGoods
    {
        [Key]
        public int Id { get; set; }
        public int? OrderId { get; set; }
        [ForeignKey(nameof(OrderId))]
        public virtual OrderGoods Order { get; set; }

    }
}
