﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BeautySalon.DATA_ACCESS.Entities
{
    public class Goods
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public float Price { get; set; }

        [Required]
        public string Image { get; set; }

        [Required]
        public string Description { get; set; }

        public int? ProductId { get; set; }
        [ForeignKey(nameof(ProductId))]
        public virtual GoodsType ProductType { get; set; }
    }
}
