using System;
using PropertyManagementSystem.Models;
using System.ComponentModel.DataAnnotations;

namespace PropertyManagementSystem.DTOs
{
	public class ApartmentDto:BaseModel
	{        
        public string ApartmentNum { get; set; }       
        public string Floor { get; set; }
        public float AreaSqft { get; set; }

        public string AppUserId { get; set; }
        public AppUserDto Owner { get; set; }

        public string tenantId { get; set; }
        public AppUserDto Tenant { get; set; }

        public long BuildingId { get; set; }
        public Building Building { get; set; }
    }
}

