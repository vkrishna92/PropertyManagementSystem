using System.ComponentModel.DataAnnotations;

namespace PropertyManagementSystem.Models
{
    public class Building:BaseModel
    {
        [Required,StringLength(40)]
        public string Name { get; set; }
        public long CommunityId { get; set; }
        public Community Community { get; set; }
        public bool UseCommunityAddress { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }

        [StringLength(50)]
        public string City { get; set; }

        [StringLength(50)]
        public string State { get; set; }

        [StringLength(60)]
        public string Country { get; set; }

        [StringLength(10)]
        public string Zipcode { get; set; }
    }
}
