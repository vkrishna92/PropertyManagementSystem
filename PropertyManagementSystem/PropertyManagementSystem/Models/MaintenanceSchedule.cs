using System;

namespace PropertyManagementSystem.Models
{
    public class MaintenanceSchedule: BaseModel
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public long ApartmentId { get; set; }
        public Apartment Apartment { get; set; }
        public DateTime PeriodStartDate { get; set; }
        public DateTime PeriodEndDate { get; set; }
        public float MaintenanceAmount { get; set; }
    }
}
