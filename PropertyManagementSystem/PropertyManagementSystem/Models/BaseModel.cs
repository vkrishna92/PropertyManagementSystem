using System;

namespace PropertyManagementSystem.Models
{
    public class BaseModel
    {
        public long Id { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public DateTime ModifiedDateTime { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
    }
}
