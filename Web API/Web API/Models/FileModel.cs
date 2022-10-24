using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web_API.Models
{
    public class FileModel
    {
        public IFormFile file { get; set; }
        public String altText { get; set; }
        public String description { get; set; }
    }
}
