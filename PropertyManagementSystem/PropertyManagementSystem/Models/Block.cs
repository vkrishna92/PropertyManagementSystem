using System.ComponentModel.DataAnnotations;

namespace PropertyManagementSystem.Models
{
    public class Block:BaseModel
    {
        [Required,StringLength(40)]
        public string Name { get; set; }
        public long CommunityId { get; set; }
        public Community Community { get; set; }
    }
}
