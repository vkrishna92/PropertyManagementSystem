using System.ComponentModel.DataAnnotations;

namespace PropertyManagementSystem.Models
{
    public class ApartmentUnit:BaseModel
    {
        [Required]
        public string UnitNumber { get; set; }
        [Required]
        public string FloorNumber { get; set; }
        [Required]
        public string BuildingNumber { get; set; }
        public AppUser Owner { get; set; }
    }
}
