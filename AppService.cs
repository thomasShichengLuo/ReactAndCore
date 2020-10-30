using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1
{
    public class AppService : IAppService
    {
        public static List<Product> myList = new List<Product>();
        public int CalculateId()
        {
            int nextId = 1;
            foreach(Product product in myList)
            {
                if (product.Id > nextId)
                    nextId = product.Id;
            }

            return nextId + 1 ;
        }
        public List<Product> GetProducts()
        {
            return myList;
        }
        public bool AddProduct(Product input)
        {
            input.Id = CalculateId();
            myList.Add(input);
            return true;
        }
        public Product GetProductById(int id)
        {
            return myList.Find(x => x.Id == id);
        }
    }
}
