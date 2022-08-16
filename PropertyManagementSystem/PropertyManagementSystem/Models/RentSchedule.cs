using System;
using System.ComponentModel.DataAnnotations;

namespace PropertyManagementSystem.Models
{
    public class RentSchedule:BaseModel
    {   
        [StringLength(50)]
        public string Description { get; set; }
        public DateTime PeriodStartDate { get; set; }
        public DateTime PeriodEndDate { get; set; }
        public float RentAmount { get; set; }
        public float MaintenanceAmount { get; set; }
        public float TotalAmount { get; set; }
        public long RentAgreementId { get; set; }
        public RentAgreement RentAgreement { get; set; }
    }
}
