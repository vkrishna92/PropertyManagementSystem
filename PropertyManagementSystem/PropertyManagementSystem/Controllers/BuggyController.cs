using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PropertyManagementSystem.Contants;
using PropertyManagementSystem.Interfaces;
using PropertyManagementSystem.Models;
using System.Threading.Tasks;

namespace PropertyManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuggyController : ControllerBase
    {
        private readonly IGenericRepository<ApartmentUnit> _apartmentUnitRepo;

        public BuggyController(IGenericRepository<ApartmentUnit> apartmentUnitRepo)
        {
            _apartmentUnitRepo = apartmentUnitRepo;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {            
            ApartmentUnit apartmentUnit = new ApartmentUnit()
            {
                BuildingNumber = "A",
                FloorNumber = "I",
                UnitNumber = "101",
                Id = 0
            };
            _apartmentUnitRepo.Insert(apartmentUnit);
            await _apartmentUnitRepo.Save();
            return Ok(apartmentUnit);
        }
    }
}
