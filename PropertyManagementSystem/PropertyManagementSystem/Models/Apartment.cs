using System.ComponentModel.DataAnnotations;

namespace PropertyManagementSystem.Models
{
    public class Apartment: BaseModel
    {
        [Required,StringLength(10)]
        public string ApartmentNum { get; set; }

        [Required,StringLength(10)]
        public string Floor { get; set; }        
        public float AreaSqft { get; set; }

        public string AppUserId { get; set; }
        public AppUser Owner { get; set; }

        public long BuildingId { get; set; }
        public Building Building { get; set; }
    }
}
