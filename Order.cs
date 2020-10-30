using System;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1
{
    public class Order
    {
        [Required]
        public int ProductId { get; set; }
        public string ProductName { get; set; }

        public double UnitPrice { get; set; }
        [Required]
        [Range(1, 9999)]
        public int Quantity { get; set; }
        
        public double Subtotal { get => UnitPrice * Quantity; }

    }
}
