using Microsoft.EntityFrameworkCore;
using PropertyManagementSystem.DataAccess;
using PropertyManagementSystem.DTOs;
using PropertyManagementSystem.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PropertyManagementSystem.Repository
{
    public class GenericRepository<TEntity>: IGenericRepository<TEntity> where TEntity : class
    {
        private readonly DataContext _dataContext;
        private readonly DbSet<TEntity> _entities;
        public GenericRepository(DataContext dataContext )
        {
            _dataContext = dataContext;
            this._entities = dataContext.Set<TEntity>();
        }

        public void Delete(long id)
        {
            TEntity entityToDelete = _entities.Find( id );
            Delete( entityToDelete );
        }
        public virtual void Delete(TEntity entityToDelete)
        {
            if (_dataContext.Entry(entityToDelete).State == EntityState.Detached)
            {
                _entities.Attach(entityToDelete);
            }
            _entities.Remove(entityToDelete);
        }

        public async Task<List<TEntity>> GetAll(PaginationParameters pagination)
        {
            var res = await _entities.Skip((pagination.PageNumber - 1) * pagination.PageSize).Take(pagination.PageSize).ToListAsync();
            return res;
        }

        public async Task<TEntity> GetById(long id)
        {
            return await _entities.FindAsync(id);
        }

        public void Insert(TEntity obj)
        {
            if (obj == null)
                throw new ArgumentNullException("entity");            
            _entities.Add(obj); 
        }

        public async Task Save()
        {
            await _dataContext.SaveChangesAsync();
        }

        public void Update(TEntity obj)
        {
            if (obj == null)
                throw new ArgumentNullException("entity");
            _entities.Attach(obj);
            _dataContext.Entry(obj).State = EntityState.Modified;
        }       
    }
}
