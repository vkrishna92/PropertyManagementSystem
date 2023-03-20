using System;
using PropertyManagementSystem.Models;

namespace PropertyManagementSystem.DTOs
{
	public class MaintenanceScheduleParams: MaintenanceScheduleDto
    {
        public int? Skip { get; set; }
        public int? Take { get; set; }
        public MaintenanceScheduleParams()
		{
		}
	}
}

