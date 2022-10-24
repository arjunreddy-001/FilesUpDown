using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Web_API.Data
{
    public partial class Files
    {
        public int Id { get; set; }
        [Required]
        [StringLength(100)]
        public string UniqueName { get; set; }
        [Required]
        [StringLength(50)]
        public string ActualName { get; set; }
        [Required]
        [StringLength(10)]
        public string Extension { get; set; }
        [Required]
        [StringLength(100)]
        public string ContentType { get; set; }
        [Required]
        [StringLength(250)]
        public string Path { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? DateAdded { get; set; }
        [StringLength(250)]
        public string AltText { get; set; }
        [StringLength(250)]
        public string Description { get; set; }
    }
}
