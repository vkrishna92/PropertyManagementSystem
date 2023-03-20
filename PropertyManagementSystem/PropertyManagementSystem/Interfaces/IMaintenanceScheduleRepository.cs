using System;
using PropertyManagementSystem.DTOs;
using PropertyManagementSystem.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PropertyManagementSystem.Interfaces
{
	public interface IMaintenanceScheduleRepository
	{
        Task<List<MaintenanceSchedule>> GetAll(PaginationParameters parameters);
        Task<List<MaintenanceSchedule>> GenerateScheduleByAgreementId(long apartmentId);
        Task<MaintenanceSchedule> GetById(long id);
        Task<List<MaintenanceSchedule>> GetByAgreementId(long agreementId);
        void Insert(MaintenanceSchedule obj);
        void Update(MaintenanceSchedule obj);
        void Delete(long id);
        Task Save();
    }
}

