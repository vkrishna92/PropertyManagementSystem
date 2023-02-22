using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PropertyManagementSystem.DTOs;
using PropertyManagementSystem.Interfaces;
using PropertyManagementSystem.Models;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace PropertyManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApartmentController : ControllerBase
    {
        private readonly IApartmentRepository _apartmentRepository;

        public ApartmentController(IApartmentRepository apartmentRepository)
        {
            _apartmentRepository = apartmentRepository;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var apartment = await _apartmentRepository.GetById(id);
            return Ok(apartment);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] PaginationParameters paginationParameters)
        {
            var apartments = await _apartmentRepository.GetAll(paginationParameters);
            return Ok(apartments);
        }
        [HttpGet("myUnits")]
        public async Task<IActionResult> getMyUnits()
        {
            PaginationParameters pagination = new PaginationParameters();
            pagination.PageNumber = 1;
            pagination.PageSize = 10000;
            var apartments = await _apartmentRepository.GetAll(pagination);
            var appUser = User.Identities.First().Claims.FirstOrDefault();
            if (appUser == null)
                return Unauthorized();
            var userApartments = apartments.Where(r => r.AppUserId == appUser.Value).ToList();
            return Ok(userApartments);
        }
        
        [HttpPost]
        public async Task<IActionResult> Insert(Apartment apartment)
        {
            _apartmentRepository.Insert(apartment);
            await _apartmentRepository.Save();
            return Ok(apartment);
        }
        [HttpPut]
        public async Task<IActionResult> Update(Apartment apartment)
        {
            _apartmentRepository.Update(apartment);
            await _apartmentRepository.Save();
            return Ok(apartment);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            _apartmentRepository.Delete(id);
            await _apartmentRepository.Save();
            return Ok();
        }
    }
}
