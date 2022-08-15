using System;

namespace PropertyManagementSystem.Models
{
    public class MaintenancePaymHistory: BaseModel
    {
        public int MaintenanceScheduleId { get; set; }
        public MaintenanceSchedule MaintenanceSchedule { get; set; }
        public DateTime TransDate { get; set; }
        public float AmountPaid { get; set; }

    }
}
