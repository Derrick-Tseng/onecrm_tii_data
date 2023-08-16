using System;
using System.Collections.Generic;

namespace backend
{
    public partial class Datum
    {
        public string Productnum { get; set; } = null!;
        public string? Productname { get; set; }
        public string? Approvaldate { get; set; }
        public string? Startdate { get; set; }
        public string? Enddate { get; set; }
        public string? Approvalnum { get; set; }
        public string? Company { get; set; }
        public byte[][]? Productcontent { get; set; }
        public byte[][]? Treaty { get; set; }
        public byte[][]? Rate { get; set; }
        public string? Status { get; set; }
    }
}
