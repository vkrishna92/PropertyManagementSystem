using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PropertyManagementSystem.DataAccess;
using PropertyManagementSystem.DTOs;
using PropertyManagementSystem.Interfaces;
using PropertyManagementSystem.Models;

namespace PropertyManagementSystem.Repository
{
	public class MaintenanceScheduleRepository: IMaintenanceScheduleRepository
	{
        private readonly DataContext _dataContext;
        public MaintenanceScheduleRepository(DataContext dataContext)
		{
            _dataContext = dataContext;
		}

        public void Delete(long id)
        {
            throw new NotImplementedException();
        }

        public async void GenerateScheduleByApartmentId(long apartmentId)
        {
            //retrieve maintenance agreement for the apartment
            var apartment = await _dataContext.Apartments.FirstOrDefaultAsync(a => a.Id == apartmentId);
            if (apartment == null)
                throw new Exception("Apartment does not exists");
            var agreement = await _dataContext.MaintenanceAgreements.FirstOrDefaultAsync(a => a.ApartmentId == apartmentId);
        }

        public async Task<List<MaintenanceSchedule>> GetAll(PaginationParameters paginationParameters)
        {
            var agreements = await _dataContext.MaintenanceSchedules
                                              .Include(m => m.MaintenanceAgreement)                                              
                                              .Skip((paginationParameters.PageNumber - 1) * paginationParameters.PageSize)
                                              .Take(paginationParameters.PageSize).ToListAsync();
            return agreements;
        }

        public async Task<MaintenanceSchedule> GetById(long id)
        {
            var maintenanceSchedule = await _dataContext.MaintenanceSchedules
                                                        .Include(m => m.MaintenanceAgreement)
                                                        .FirstOrDefaultAsync(m => m.Id == id);
            return maintenanceSchedule;
        }

        public async void Insert(MaintenanceSchedule obj)
        {
            
        }

        public async Task Save()
        {
            await _dataContext.SaveChangesAsync();
        }

        public void Update(MaintenanceSchedule obj)
        {
            throw new NotImplementedException();
        }
    }
}

