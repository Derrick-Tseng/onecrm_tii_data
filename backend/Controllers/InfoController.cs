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
                    startDate = x.Startdate,
                    endDate = x.Enddate,
                    status = x.Status
                }
            );
            return Ok(info);
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

        [HttpPost("Search")]
        public IActionResult Search([FromQuery] SearchObj request)
        {
            if (request.SearchBar != null && request.SearchBar.Length != 0){
                //search bar
                var info = this._DBContext.Data.Where(o => 
                    o.Productnum == request.SearchBar || o.Productname == request.SearchBar
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
                );
                return Ok(info);
            }
            else if(request.Company != null && request.Company.Length != 0 && request.Status != null && request.Status.Length != 0){
                // filtered by company and status
                var info = this._DBContext.Data.Where(o => 
                    o.Company == request.Company && o.Status == request.Status
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
                );
                return Ok(info);
            }
            else if (request.Company == null && request.Status != null){
                // filtered only by status
                var info = this._DBContext.Data.Where(o => 
                    o.Status == request.Status
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
                );
                return Ok(info);
            }
            else if(request.Company != null && request.Status == null){
                // filtered by company
                var info = this._DBContext.Data.Where(o => 
                    o.Company == request.Company
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
                );
                return Ok(info);
            }
            else{
                return Ok(false);
            }
        }        
    }

    public class SearchObj
    {
        public string ?Company { get; set; }
        public string ?Status { get; set; }
        public string ?SearchBar { get; set; }
    }
} 
