using Microsoft.EntityFrameworkCore;
using PropertyManagementSystem.DataAccess;
using PropertyManagementSystem.DTOs;
using PropertyManagementSystem.Interfaces;
using PropertyManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PropertyManagementSystem.Repository
{
    public class ApartmentRepository : IApartmentRepository
    {
        private readonly DataContext _dataContext;

        public ApartmentRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public void Delete(long id)
        {
            var apartment = _dataContext.Apartments.FirstOrDefault(a => a.Id == id);
            if (apartment == null)
                throw new Exception("Cannot find apartment with Id " + id);
            _dataContext.Apartments.Remove(apartment);
        }

        public void Delete(Apartment entityToDelete)
        {
            throw new System.NotImplementedException();
        }

        public async Task<List<Apartment>> GetAll(PaginationParameters paginationParameters)
        {
            
            var apartments = await _dataContext.Apartments
                                    .Include(b => b.Building)
                                    .Include(a=> a.Owner)
                                    .Include(t => t.Tenant)
                                    .Skip((paginationParameters.PageNumber-1) * paginationParameters.PageSize)
                                    .Take(paginationParameters.PageSize).ToListAsync();
            return apartments;
        }

        public async Task<Apartment> GetById(long id)
        {
            var apartment = await _dataContext.Apartments
                            .Include(b => b.Building)
                            .Include(a => a.Owner)
                            .FirstOrDefaultAsync(a => a.Id == id);
            return apartment;
        }

        public void Insert(Apartment obj)
        {
            if (obj == null)
                throw new Exception("Cannot insert null object in Apartment table.");
            var building = _dataContext.Buildings.FirstOrDefault(b => b.Id == obj.BuildingId);
            var appUser = _dataContext.AppUsers.FirstOrDefault(a => a.Id == obj.AppUserId);
            if(building == null)
                throw new Exception("Cannot insert in Apartment table. Building is null.");
            if(appUser == null)
            {
                obj.AppUserId = null;
                obj.Owner = null;
            }
            else
            {
                obj.AppUserId =appUser.Id;
                obj.Owner = appUser;
            }
            obj.Building = building;
            obj.Owner = appUser;
            _dataContext.Apartments.Add(obj);
        }

        public async Task Save()
        {
            await _dataContext.SaveChangesAsync();
        }

        public void Update(Apartment obj)
        {
            if (obj == null)
                throw new Exception("Cannot update null object in Apartment table.");
            var apartment = _dataContext.Apartments.FirstOrDefault(a => a.Id == obj.Id);
            var building = _dataContext.Buildings.FirstOrDefault(b => b.Id == obj.BuildingId);
            var appUser = _dataContext.AppUsers.FirstOrDefault(a => a.Id == obj.AppUserId);
            var tenant = _dataContext.AppUsers.FirstOrDefault(a => a.Id == obj.tenantId);
            if (apartment == null || building == null)
                throw new Exception("Cannot update in Apartment table.Apartment or Building is null.");

            apartment.ApartmentNum = obj.ApartmentNum;            
            if(appUser == null)
            {
                //Scenario where owner is removed from apartment.
                apartment.AppUserId = null;
                apartment.Owner = null;
            }
            else
            {
                apartment.AppUserId = appUser.Id;
                apartment.Owner = appUser;
            }

            if(tenant == null)
            {
                apartment.tenantId = null;
                apartment.Tenant = null;
            }
            else
            {
                apartment.tenantId = tenant.Id;
                apartment.Tenant = tenant;
            }
           
            apartment.BuildingId = obj.BuildingId;
            apartment.Building = building;
            apartment.AreaSqft = obj.AreaSqft;
            apartment.Floor = obj.Floor;
            apartment.ModifiedDateTime = DateTime.UtcNow;
            
            _dataContext.Apartments.Update(apartment);
        }
    }
}
