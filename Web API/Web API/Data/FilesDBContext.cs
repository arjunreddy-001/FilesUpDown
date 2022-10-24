using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Web_API.Data
{
    public partial class FilesDBContext : DbContext
    {
        public FilesDBContext()
        {
        }

        public FilesDBContext(DbContextOptions<FilesDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Files> Files { get; set; }
    }
}
