using System;

namespace PropertyManagementSystem.Models
{
    public class RentPaymHistory:BaseModel
    {
        public long RentScheduleId { get; set; }
        public RentSchedule RentSchedule { get; set; }
        public DateTime TransDate { get; set; }
        public float AmountPaid { get; set; }        
    }
}
