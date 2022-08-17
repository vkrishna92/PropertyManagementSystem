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
    public class CommunityController : ControllerBase
    {
        private readonly IGenericRepository<Community> _communityRepo;

        public CommunityController(IGenericRepository<Community> communityRepo)
        {
            _communityRepo = communityRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var param = new PaginationParameters() { PageNumber = 1, PageSize=1 };
            var communities = await _communityRepo.GetAll(param);
            if (communities.Count == 0)
                return Ok();
            return Ok(communities[0]);
        }
        [HttpPost]
        public async Task<IActionResult> Post(Community community)
        {
            community.CreatedDateTime = DateTime.Now;
            _communityRepo.Insert(community);
            await _communityRepo.Save();
            return Ok(community); 
        }
        [HttpPut]
        public async Task<IActionResult> Update(Community community)
        {
            community.ModifiedDateTime = DateTime.UtcNow;
            _communityRepo.Update(community);
            await _communityRepo.Save();
            return Ok(community);
        }
    }
}
