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
    public class ApartmentController : ControllerBase
    {
        private readonly IApartmentRepository _apartmentRepository;

        public ApartmentController(IApartmentRepository apartmentRepository)
        {
            _apartmentRepository = apartmentRepository;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll(PaginationParameters paginationParameters)
        {
            var apartments = await _apartmentRepository.GetAll(paginationParameters);
            return Ok(apartments);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var apartment = await _apartmentRepository.GetById(id);
            return Ok(apartment);
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
        [HttpDelete]
        public async Task<IActionResult> Delete(long id)
        {
            _apartmentRepository.Delete(id);
            await _apartmentRepository.Save();
            return Ok();
        }
    }
}
