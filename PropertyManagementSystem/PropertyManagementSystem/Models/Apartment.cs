using System.ComponentModel.DataAnnotations;

namespace PropertyManagementSystem.Models
{
    public class Apartment: BaseModel
    {
        [Required,StringLength(10)]
        public string ApartmentNum { get; set; }

        [Required,StringLength(10)]
        public string Floor { get; set; }

        [StringLength(10)]
        public string Block { get; set; }
        
        public float AreaSqft { get; set; }

        public long CommunityId { get; set; }
        public Community Community { get; set; }
    }
}
