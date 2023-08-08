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
    public class PdfController : ControllerBase
    {
        private readonly postgresContext _DBContext;
        public PdfController(postgresContext dbcontext)
        {
            this._DBContext = dbcontext;
        }

        [HttpGet("GetProductContentPdf/{productNum}")] 
        public IActionResult GetProductContentPdf(string productNum)
        {
            var pdf = this._DBContext.Data.Where(o => o.Productnum == productNum).Select( x =>
                new {
                    pdf = x.Productcontent
                }
            );
            return Ok(pdf);
        }

        [HttpGet("GetTreatyPdf/{productNum}")] 
        public IActionResult GetTreatyPdf(string productNum)
        {
            var pdf = this._DBContext.Data.Where(o => o.Productnum == productNum).Select( x =>
                new {
                    pdf = x.Treaty
                }
            );
            return Ok(pdf);
        }

        [HttpGet("GetRatePdf/{productNum}")] 
        public IActionResult GetRatePdf(string productNum)
        {
            var pdf = this._DBContext.Data.Where(o => o.Productnum == productNum).Select( x =>
                new {
                    pdf = x.Rate
                }
            );
            return Ok(pdf);
        }

    }
} 
