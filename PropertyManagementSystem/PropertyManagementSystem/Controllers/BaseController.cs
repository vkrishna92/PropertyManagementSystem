using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PropertyManagementSystem.DTOs;
using PropertyManagementSystem.Interfaces;
using PropertyManagementSystem.Models;
using System;
using System.Threading.Tasks;

namespace PropertyManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        private readonly IGenericRepository<Community> _communityRepository;

        public BaseController(IGenericRepository<Community> communityRepository)
        {
            _communityRepository = communityRepository;
        }

        protected async Task<long> getCommunityID()
        {
            var communities = await _communityRepository.GetAll(new PaginationParameters() { PageNumber = 1, PageSize=1 });
            if (communities.Count == 0)
                throw new Exception("Community configuration is missing.");
            return communities[0].Id;
        }
    }
}
