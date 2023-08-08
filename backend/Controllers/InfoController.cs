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
            var info = this._DBContext.Data.ToList();
            return Ok(info);
        }

        [HttpGet("GetInfo/{productNum}")] 
        public IActionResult GetInfo(string productNum)
        {
            var info = this._DBContext.Data.FirstOrDefault(o => o.Productnum == productNum);
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
    }
} 
