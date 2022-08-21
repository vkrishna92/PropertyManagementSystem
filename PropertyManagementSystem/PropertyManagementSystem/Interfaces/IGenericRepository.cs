using PropertyManagementSystem.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PropertyManagementSystem.Interfaces
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        Task<List<TEntity>> GetAll(PaginationParameters paginationParameters);
        Task<TEntity> GetById(long id);
        void Insert(TEntity obj);
        void Update(TEntity obj);
        void Delete(long id);
        void Delete(TEntity entityToDelete);
        Task Save();
    }
}
