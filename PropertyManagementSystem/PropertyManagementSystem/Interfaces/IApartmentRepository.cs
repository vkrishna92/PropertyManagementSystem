using PropertyManagementSystem.DTOs;
using PropertyManagementSystem.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PropertyManagementSystem.Interfaces
{
    public interface IApartmentRepository
    {
        Task<List<Apartment>> GetAll(PaginationParameters paginationParameters);
        Task<Apartment> GetById(long id);        
        void Insert(Apartment obj);
        void Update(Apartment obj);
        void Delete(long id);
        Task Save();
    }
}
