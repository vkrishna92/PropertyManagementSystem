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
        public DbSet<Community> Communities { get; set; }
        public DbSet<Block> Blocks { get; set; }
        public DbSet<Apartment> Apartments { get; set; }
        public DbSet<Owner> Owners { get; set; }
        public DbSet<Tenant> Tenants { get; set; }
        public DbSet<RentAgreement> RentAgreements { get; set; }
        public DbSet<RentSchedule> RentSchedules { get; set; }

        public DbSet<MaintenanceSchedule> MaintenanceSchedules { get; set; }
        public DbSet<RentPaymHistory> RentPaymHistorys { get; set; }
        public DbSet<MaintenancePaymHistory> MaintenancePaymHistories { get; set; }
        public DbSet<MaintenanceAgreement> MaintenanceAgreements { get; set; }
    }
}
