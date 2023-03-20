using System;
using PropertyManagementSystem.Models;

namespace PropertyManagementSystem.DTOs
{
	public class MaintenanceScheduleDto
	{
        public long? Id { get; set; }
        public DateTime PeriodStartDate { get; set; }
        public DateTime PeriodEndDate { get; set; }
        public float MaintenanceAmount { get; set; }
        public bool? Status { get; set; }
        public DateTime? TransDate { get; set; }
        public long? MaintenanceAgreementId { get; set; }                
	}
}

