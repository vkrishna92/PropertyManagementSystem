using PropertyManagementSystem.DataAccess;
using PropertyManagementSystem.DTOs;
using PropertyManagementSystem.Interfaces;
using PropertyManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PropertyManagementSystem.Repository
{
    public class CommunityRepository : GenericRepository<Community>,ICommunityRepository
    {
        public CommunityRepository(DataContext dataContext) : base(dataContext)
        {

        }       
    }
}
