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
	public class MaintenanceRepository: IMaintenanceRepository
	{
        private readonly DataContext _dataContext;
        public MaintenanceRepository(DataContext dataContext)
		{
            _dataContext = dataContext;
		}

        public void Delete(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<MaintenanceAgreement>> GetAll(PaginationParameters paginationParameters)
        {
            var agreements = await _dataContext.MaintenanceAgreements
                                              .Include(m => m.AppUser)
                                              .Include(a => a.Apartment)
                                              .Skip((paginationParameters.PageNumber - 1) * paginationParameters.PageSize)
                                              .Take(paginationParameters.PageSize).ToListAsync();
            return agreements;
        }

        public async Task<MaintenanceAgreement> GetById(long id)
        {
            var agreement = await _dataContext.MaintenanceAgreements
                            .Include(m => m.AppUser)
                            .Include(a => a.Apartment)
                            .FirstOrDefaultAsync(a => a.Id == id);

            return agreement;
        }

        public async void Insert(MaintenanceAgreement obj)
        {
            if (obj == null)
                throw new Exception("Cannot insert null object in MaintenanceAgreement table.");
            var apartment = _dataContext.Apartments.FirstOrDefault(a => a.Id == obj.ApartmentId);
            var appUser = _dataContext.AppUsers.FirstOrDefault(a => a.Id == obj.AppUserId);
            if(apartment == null)
                throw new Exception("Cannot insert in MaintenanceAgreement table. Apartment is null.");
            if(appUser == null)
                throw new Exception("Cannot insert in MaintenanceAgreement table. User is null.");
            obj.AppUser = appUser;
            obj.Apartment = apartment;
            _dataContext.Add(obj);
        }

        public async Task Save()
        {
            await _dataContext.SaveChangesAsync();
        }

        public void Update(MaintenanceAgreement obj)
        {
            if (obj == null)
                throw new Exception("Cannot update null object in MaintenanceAgreement table.");
            var agreement = _dataContext.MaintenanceAgreements.FirstOrDefault(a => a.Id == obj.Id);
            var apartment = _dataContext.Apartments.FirstOrDefault(a => a.Id == obj.ApartmentId);
            var appUser = _dataContext.AppUsers.FirstOrDefault(a => a.Id == obj.AppUserId);
            if (agreement == null)
                throw new Exception("Cannot find Maintenance Agreement with Id:" + obj.Id);
            if (apartment == null)
                throw new Exception("Cannot update MaintenanceAgreement. Apartment is null.");
            if (appUser == null)
                throw new Exception("Cannot update MaintenanceAgreement. User is null.");

            agreement.AppUserId = obj.AppUserId;
            agreement.AppUser = obj.AppUser;
            agreement.ApartmentId = obj.ApartmentId;
            agreement.Apartment = apartment;
            agreement.FromDate = obj.FromDate;
            agreement.ToDate = obj.ToDate;
            agreement.MaintenanceAmount = obj.MaintenanceAmount;
            _dataContext.Update(agreement);
        }
    }
}

