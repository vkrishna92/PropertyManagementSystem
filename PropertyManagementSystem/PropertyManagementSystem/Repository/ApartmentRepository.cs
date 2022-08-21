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
                                    .Skip(paginationParameters.PageNumber * paginationParameters.PageSize)
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
            if(building == null || appUser == null)
                throw new Exception("Cannot insert in Apartment table. Building or AppUser is null.");
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
            if (apartment == null || building == null || appUser == null)
                throw new Exception("Cannot update in Apartment table.Apartment, Building or AppUser is null.");
            obj.Building = building;
            obj.Owner = appUser;
            _dataContext.Apartments.Update(obj);
        }
    }
}
