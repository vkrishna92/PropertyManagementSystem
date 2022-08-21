using PropertyManagementSystem.DTOs;
using PropertyManagementSystem.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PropertyManagementSystem.Interfaces
{
    public interface IBuildingRepository
    {
        Task<List<Building>> GetAll(PaginationParameters paginationParameters);
        Task<Building> GetById(long id);
        void Insert(Building obj);
        void Update(Building obj);
        void Delete(long id);
        Task Save();
    }
}
