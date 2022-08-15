using System.ComponentModel.DataAnnotations;

namespace PropertyManagementSystem.Models
{
    public class Community: BaseModel
    {
        [Required, StringLength(50)]
        public string Name { get; set; }
        [Required]
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }

        [Required, StringLength(50)]
        public string City { get; set; }

        [Required, StringLength(50)]
        public string State { get; set; }

        [Required, StringLength(60)]
        public string Country { get; set; }

        [Required,StringLength(10)]
        public string Zipcode { get; set; }
    }
}
