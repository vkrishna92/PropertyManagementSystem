using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PropertyManagementSystem.DTOs;
using PropertyManagementSystem.Interfaces;
using PropertyManagementSystem.Models;
using System.Threading.Tasks;

namespace PropertyManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuildingController : ControllerBase
    {
        private readonly IBuildingRepository _buildingRepository;

        public BuildingController(IBuildingRepository buildingRepository, IGenericRepository<Community> communityRep)
        {
            _buildingRepository = buildingRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] PaginationParameters paginationParameters)
        {
            var buildings = await _buildingRepository.GetAll(paginationParameters);
            return Ok(buildings);
        }
        [HttpPost]
        public async Task<IActionResult> Insert(Building building)
        {
            _buildingRepository.Insert(building);
            await _buildingRepository.Save();
            return Ok(building);
        }

        [HttpPut]
        public async Task<IActionResult> Update(Building building)
        {
            _buildingRepository.Update(building);
            await _buildingRepository.Save();
            return Ok(building);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            _buildingRepository.Delete(id);
            await _buildingRepository.Save();
            return NoContent();
        }
    }
}
