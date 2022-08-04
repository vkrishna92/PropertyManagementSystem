using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PropertyManagementSystem.Models;

namespace PropertyManagementSystem.DataAccess
{
    public class DataContext: IdentityDbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<ApartmentUnit> ApartmentUnits { get; set; }
        public DbSet<ApartmentUnitResidentMap> ApartmentUnitResidentMaps { get; set; }
    }
}
