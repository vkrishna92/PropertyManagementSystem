using System;

namespace PropertyManagementSystem.Models
{
    public class MaintenanceSchedule: BaseModel
    {        
        public DateTime PeriodStartDate { get; set; }
        public DateTime PeriodEndDate { get; set; }
        public float MaintenanceAmount { get; set; }
        public long MaintenanceAgreementId { get; set; }
        public MaintenanceAgreement MaintenanceAgreement { get; set; }
    }
}
