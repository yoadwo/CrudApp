using System.Collections.Generic;
using CrudApp.Models;
using Microsoft.EntityFrameworkCore;


namespace CrudApp.DAL
{
    public class BloggingContext: DbContext
    {
        public BloggingContext(DbContextOptions<BloggingContext> options)
       : base(options)
        {
        }

        public DbSet<Blog> Blogs { get; set; }
        public DbSet<Post> Posts { get; set; }
    }
}
