using System.Xml.XPath;
using System.Xml.Linq;
using System.Security.Cryptography.X509Certificates;
using System.IO.Compression;
using System.Xml.Schema;
using System.Threading;
using System.Security.AccessControl;
using System.Reflection;
using System.Diagnostics;
using System.Runtime.CompilerServices;
using System.Globalization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using System;


namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InfoController : ControllerBase
    {
    
        private readonly postgresContext _DBContext;
        public InfoController(postgresContext dbcontext)
        {
            this._DBContext = dbcontext;
        }

        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            var info = this._DBContext.Data.Select( x => new {
                productNum = x.Productnum,
                productName = x.Productname,
                company = x.Company,
                approvalDate = x.Approvaldate,
                startDate = x.Startdate,
                endDate = x.Enddate,
                status = x.Status
            }).ToList();
            return Ok(info);
        }
        

        [HttpGet("GetInfo/{productNum}")] 
        public IActionResult GetInfo(string productNum)
        {
            var info = this._DBContext.Data.Where(o => o.Productnum == productNum).Select( x =>
                new {
                    productNum = x.Productnum,
                    productName = x.Productname,
                    company = x.Company,
                    approvalDate = x.Approvaldate,
                    approvalNum = x.Approvalnum,
                    startDate = x.Startdate,
                    endDate = x.Enddate,
                    status = x.Status
                }
            );
            return Ok(info);
        }
        

        [HttpGet("GetList")]
        public IActionResult Search(string limit, string page, [FromQuery] SearchObj request)
        {
            var lim = int.Parse(limit);
            var pg = int.Parse(page);
            
            if (request.SearchBox != null && request.SearchBox.Length != 0){
                Console.WriteLine("11111");
                //search bar
                var info = this._DBContext.Data.Where(o => 
                    o.Productnum.Contains(request.SearchBox) 
                    || (o.Productname!=null && o.Productname.Contains(request.SearchBox))
                    || (o.Approvalnum!=null && o.Approvalnum.Contains(request.SearchBox))
                ).Select( x =>
                    new {
                        productNum = x.Productnum,
                        productName = x.Productname,
                        company = x.Company,
                        approvalDate = x.Approvaldate,
                        startDate = x.Startdate,
                        endDate = x.Enddate,
                        status = x.Status
                    }
                ).ToList().Skip((pg-1) * lim).Take(lim);

                var amount = info.Count();
                // count how many pages
                var n =this._DBContext.Data.Where(o => 
                    o.Productnum.Contains(request.SearchBox) 
                    || (o.Productname!=null && o.Productname.Contains(request.SearchBox))
                    || (o.Approvalnum!=null && o.Approvalnum.Contains(request.SearchBox))
                ).Count();
                double k  = Math.Ceiling((double)n/lim);
                
                var retInfo = new {
                    pages = k,
                    data = info
                }; 
                return Ok(retInfo);
            }
            
            else if(request.Company != "all" && request.Company != null && request.Company.Length != 0 && request.Status != "all" && request.Status != null && request.Status.Length != 0){
                // filtered by company and status
                Console.WriteLine("22222");
                bool reqStatus = false;
                if (request.Status == "selling"){
                    reqStatus = true;
                }
                else{
                    reqStatus = false;
                }
                var info = this._DBContext.Data.Where(o => 
                    o.Company == request.Company && o.Status == reqStatus
                ).Select( x =>
                    new {
                        productNum = x.Productnum,
                        productName = x.Productname,
                        company = x.Company,
                        approvalDate = x.Approvaldate,
                        startDate = x.Startdate,
                        endDate = x.Enddate,
                        status = x.Status
                    }
                ).ToList().Skip((pg-1) * lim).Take(lim);;
                var amount = info.Count();
                // count how many pages
                var n =this._DBContext.Data.Where(o => 
                    o.Company == request.Company && o.Status == reqStatus
                ).Count();
                double k  = Math.Ceiling((double)n/lim);

                var retInfo = new {
                    pages = k,
                    data = info
                };   
                    return Ok(retInfo);
            }
            else if (request.Company == "all" && request.Status != "all"  && request.Status != null && request.Status.Length != 0){
                // filtered only by status
                Console.WriteLine("33333");
                bool reqStatus = false;
                if (request.Status == "selling"){
                    reqStatus = true;
                }
                else{
                    reqStatus = false;
                }
                var info = this._DBContext.Data.Where(o => 
                    o.Status == reqStatus
                ).Select( x =>
                    new {
                        productNum = x.Productnum,
                        productName = x.Productname,
                        company = x.Company,
                        approvalDate = x.Approvaldate,
                        startDate = x.Startdate,
                        endDate = x.Enddate,
                        status = x.Status
                    }
                ).ToList().Skip((pg-1) * lim).Take(lim);;
                var amount = info.Count();
                // count how many pages
                var n =this._DBContext.Data.Where(o => 
                    o.Status == reqStatus
                ).Count();
                double k  = Math.Ceiling((double)n/lim);

                var retInfo = new {
                    pages = k,
                    data = info
                };   
                return Ok(retInfo);
                
            }
            else if(request.Company != "all"  && request.Company != null && request.Company.Length != 0  && request.Status == "all"){
                // filtered by company
                Console.WriteLine("44444");
                Console.WriteLine("+++++" + request.Company);
                var info = this._DBContext.Data.Where(o => 
                    request.Company.Contains(o.Company)
                ).Select( x =>
                    new {
                        productNum = x.Productnum,
                        productName = x.Productname,
                        company = x.Company,
                        approvalDate = x.Approvaldate,
                        startDate = x.Startdate,
                        endDate = x.Enddate,
                        status = x.Status
                    }
                ).ToList().Skip((pg-1) * lim).Take(lim);
                Console.WriteLine("+++++", info);
                var amount = info.Count();
                // count how many pages
                var n =this._DBContext.Data.Where(o => 
                    request.Company.Contains(o.Company)
                ).Count();
                double k  = Math.Ceiling((double)n/lim);

                var retInfo = new {
                    pages = k,
                    data = info
                };  
                return Ok(retInfo);
                
            }
            else{
                Console.WriteLine("55555");
                var info = this._DBContext.Data.Select( x => new {
                    productNum = x.Productnum,
                    productName = x.Productname,
                    company = x.Company,
                    approvalDate = x.Approvaldate,
                    startDate = x.Startdate,
                    endDate = x.Enddate,
                    status = x.Status
                }).ToList().Skip((pg-1) * lim).Take(lim);
                var amount = info.Count();
                // count how many pages
                var n =this._DBContext.Data.Count();
                double k  = Math.Ceiling((double)n/lim);

                var retInfo = new {
                    pages = k,
                    data = info
                };
                return Ok(retInfo);
            }
        }  


        [HttpDelete("Remove/{productNum}")]
        public IActionResult Remove(string productNum)
        {
            var info = this._DBContext.Data.FirstOrDefault(o => o.Productnum == productNum);
            if(info != null)
            {
                this._DBContext.Remove(info);
                this._DBContext.SaveChanges();
                return Ok(true);
            }
            return Ok(false);
        }


        [HttpPost("Create")]
        public IActionResult Create([FromBody] Datum info)
        {
            this._DBContext.Data.Add(info);
            this._DBContext.SaveChanges();
            // return Ok(true);
            return CreatedAtAction("GetAll", info.Productnum, info);
        }
    }
    
    public class SearchObj
    {
        public string ?Company { get; set; }
        public string ?Status { get; set; }
        public string ?SearchBox { get; set; }
    }
    
    
} 
