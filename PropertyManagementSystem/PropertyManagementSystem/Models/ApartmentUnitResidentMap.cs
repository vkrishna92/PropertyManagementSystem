namespace PropertyManagementSystem.Models
{
    public class ApartmentUnitResidentMap:BaseModel
    {        
        public ApartmentUnit ApartmentUnit { get; set; }        
        public AppUser Resident { get; set; }        
    }
}
