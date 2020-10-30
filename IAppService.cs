using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1
{
    public interface IAppService
    {
        public int CalculateId();
        public List<Product> GetProducts();
        public bool AddProduct(Product input);
        public Product GetProductById(int id);
    }
}
