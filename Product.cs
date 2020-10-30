using System;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1
{
    public class Product
    {

        public int Id { get; set; }
        [Required]
        [Range(0, 9999.99)]
        public double Price { get; set; }
        [StringLength(200)]
        public string Name { get; set; }

    }
}
