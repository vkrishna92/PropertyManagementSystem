using System;
using PropertyManagementSystem.DTOs;
using PropertyManagementSystem.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PropertyManagementSystem.Interfaces
{
	public interface IMaintenanceRepository
	{
        Task<List<MaintenanceAgreement>> GetAll(PaginationParameters paginationParameters);
        Task<MaintenanceAgreement> GetById(long id);
        void Insert(MaintenanceAgreement obj);
        void Update(MaintenanceAgreement obj);
        void Delete(long id);
        Task Save();
    }
}

