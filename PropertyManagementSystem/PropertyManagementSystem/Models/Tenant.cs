namespace PropertyManagementSystem.Models
{
    public class Tenant:BaseModel
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public long ApartmentId { get; set; }
        public Apartment Apartment { get; set; }
    }
}
