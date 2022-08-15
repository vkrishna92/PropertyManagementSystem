using System;

namespace PropertyManagementSystem.Models
{
    public class RentAgreement: BaseModel
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public long ApartmentId { get; set; }
        public Apartment Apartment { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public float RentAmount { get; set; }
        public float MaintenanceAmount { get; set; }
    }
}
