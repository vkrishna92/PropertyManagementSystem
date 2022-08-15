using System;
using System.ComponentModel.DataAnnotations;

namespace PropertyManagementSystem.Models
{
    public class RentSchedule:BaseModel
    {
        public int ApartmentId { get; set; }
        public Apartment Apartment { get; set; }
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }

        [StringLength(50)]
        public string Description { get; set; }
        public DateTime PeriodStartDate { get; set; }
        public DateTime PeriodEndDate { get; set; }
        public float RentAmount { get; set; }
        public float MaintenanceAmount { get; set; }
        public float TotalAmount { get; set; }
    }
}
