using System;

namespace PropertyManagementSystem.Models
{
    /// <summary>
    /// Maintenance Agreement between Owners & Association
    /// </summary>
    public class MaintenanceAgreement:BaseModel
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public long ApartmentId { get; set; }
        public Apartment Apartment { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }        
        public float MaintenanceAmount { get; set; }
    }
}
