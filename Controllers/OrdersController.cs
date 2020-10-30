using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrdersController : ControllerBase
    {

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly IAppService _appService;
        private static List<Order> myOrders = new List<Order>();

        public OrdersController(ILogger<WeatherForecastController> logger,IAppService appService)
        {
            _logger = logger;
            _appService = appService;

        }

        [HttpGet]
        public IEnumerable<Order> Get()
        {
            return myOrders.ToArray();
        }
        [HttpPost]
        public IEnumerable<Order> Post(List<Order> orders)
        {
            myOrders = new List<Order>();
            foreach (Order order in orders)
            {
                Product product = _appService.GetProductById(order.ProductId);
                if(product != null)
                {
                    order.ProductName = product.Name;
                    order.UnitPrice = product.Price;
                    myOrders.Add(order);
                }
                
            }
            return myOrders.ToArray();
        }

    }
}
