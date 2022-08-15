namespace PropertyManagementSystem.Models
{
    public class Owner:BaseModel
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public long ApartmentId { get; set; }
        public Apartment Apartment { get; set; }
    }
}
