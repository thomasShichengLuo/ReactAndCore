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
    public class ProductsController : ControllerBase
    {

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly IAppService _appService;
        

        public ProductsController(ILogger<WeatherForecastController> logger,IAppService appService)
        {
            _logger = logger;
            _appService = appService;
            List<Product> myList = _appService.GetProducts();
            if (myList.Count == 0) { 
                myList.Add(new Product
                {
                    Id = 1,
                    Price = 2.99,
                    Name = "Cookies"
                });
                myList.Add(new Product
                {
                    Id = 2,
                    Price = 2.00,
                    Name = "Bread"
                });
                myList.Add(new Product
                {
                    Id = 3,
                    Price = 5.00,
                    Name = "Orange Juice"
                });
            }
        }

        [HttpGet]
        public IEnumerable<Product> Get()
        {
            return _appService.GetProducts().ToArray();
        }
        [HttpPost]
        public IEnumerable<Product> Post(Product data)
        {
            _appService.AddProduct(data);
            
            return _appService.GetProducts().ToArray();
        }


        //[HttpGet]
        //public IEnumerable<WeatherForecast> Get()
        //{
        //    var rng = new Random();
        //    return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        //    {
        //        Date = DateTime.Now.AddDays(index),
        //        TemperatureC = rng.Next(-20, 55),
        //        Summary = Summaries[rng.Next(Summaries.Length)]
        //    })
        //    .ToArray();
        //}
    }
}
