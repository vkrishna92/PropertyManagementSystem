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
    public class BuildingRepository : IBuildingRepository
    {
        private readonly DataContext _dataContext;
        public BuildingRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public void Delete(long id)
        {
            var building = _dataContext.Buildings.Find(id);
            if (building != null)
            {
                _dataContext.Buildings.Remove(building);
            }
        }

        public async Task<List<Building>> GetAll(PaginationParameters pagination)
        {
            var buildings = await _dataContext.Buildings.Include(c=>c.Community)
                .Skip((pagination.PageNumber - 1) * pagination.PageSize)
                .Take(pagination.PageSize)
                .ToListAsync();
            return buildings;
        }
        public async Task<Building> GetById(long id)
        {
            var building = await _dataContext.Buildings.Include(c => c.Community).FirstOrDefaultAsync();
            return building;
        }
        public void Insert(Building building)
        {
            var community = _dataContext.Communities.FirstOrDefault();
            if (community == null)
                throw new Exception("Community record is missing.");
            building.CommunityId = community.Id;
            building.Community = community;
            _dataContext.Buildings.Add(building);
        }

        public async Task Save()
        {
            await _dataContext.SaveChangesAsync();
        }
        
        public async void Update(Building building)
        {
            var community = _dataContext.Communities.FirstOrDefault();
            if (community == null)
                throw new Exception("Community record is missing.");
            building.CommunityId = community.Id;
            building.Community = community;
            _dataContext.Buildings.Update(building);
        }  
    }
}
