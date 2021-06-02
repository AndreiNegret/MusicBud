using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MusicBud.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace MusicBud.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        { }

        public DbSet<User> User { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Rating> Ratings { get; set; }

    }
}
