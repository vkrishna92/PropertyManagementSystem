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
        private readonly IMaintenanceRepository _maintenanceRepository;
        private readonly IMaintenanceScheduleRepository _maintenanceScheduleRepository;
        public ApartmentController(IApartmentRepository apartmentRepository,
            IMaintenanceRepository maintenanceRepository, IMaintenanceScheduleRepository maintenanceScheduleRepository)
        {
            _apartmentRepository = apartmentRepository;
            _maintenanceRepository = maintenanceRepository;
            _maintenanceScheduleRepository = maintenanceScheduleRepository;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var apartment = await _apartmentRepository.GetById(id);
            var owner = new AppUserDto();
            if (apartment.Owner != null)
            {
                owner.Id = apartment.Owner.Id;
                owner.UserName = apartment.Owner.UserName;
                owner.Email = apartment.Owner.Email;
                owner.FirstName = apartment.Owner.FirstName;
                owner.LastName = apartment.Owner.LastName;
                owner.PhoneNumber = apartment.Owner.PhoneNumber;
            }

            var tenant = new AppUserDto();
            if (apartment.Tenant != null)
            {
                tenant.Id = apartment.tenantId;
                tenant.UserName = apartment.Tenant.UserName;
                tenant.Email = apartment.Tenant.Email;
                tenant.FirstName = apartment.Tenant.FirstName;
                tenant.LastName = apartment.Tenant.LastName;
                tenant.PhoneNumber = apartment.Tenant.PhoneNumber;
            }

            var apartmentDto = new ApartmentDto();
            apartmentDto.Id = apartment.Id;
            apartmentDto.ApartmentNum = apartment.ApartmentNum;
            apartmentDto.Floor = apartment.Floor;
            apartmentDto.AreaSqft = apartment.AreaSqft;
            apartmentDto.AppUserId = apartment.AppUserId;
            apartmentDto.Owner = owner;
            apartmentDto.tenantId = apartment.tenantId;
            apartmentDto.Tenant = tenant;
            apartmentDto.BuildingId = apartment.BuildingId;
            apartmentDto.Building = apartment.Building;

            return Ok(apartmentDto);
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

        //Maintenance Agreement Methods
        [HttpGet("maintenance-agreement-apartmentId/{id}")]
        public async Task<IActionResult> GetMaintenanceAgreementByApartmentId(long id)
        {
            var agreements = await _maintenanceRepository.GetAll(new PaginationParameters() { PageNumber = 1, PageSize = 10000 });
            var agreement = agreements.Where(a => a.ApartmentId == id && a.IsDisabled == false).FirstOrDefault();
            return Ok(agreement);
        }
        [HttpPost("maintenance-agreement")]
        public async Task<IActionResult> CreateMaintenanceAgreement(MaintenanceAgreement maintenanceAgreement)
        {
            _maintenanceRepository.Insert(maintenanceAgreement);
            await _maintenanceRepository.Save();

            //Generate paym schedule
            if (maintenanceAgreement.Id != 0)
            {
                var schedule = await _maintenanceScheduleRepository.GenerateScheduleByAgreementId(maintenanceAgreement.Id);

                foreach (var s in schedule)
                {
                    _maintenanceScheduleRepository.Insert(s);
                }
                await _maintenanceScheduleRepository.Save();
            }

            return Ok(maintenanceAgreement);
        }
        [HttpPut("maintenance-agreement")]
        public async Task<IActionResult> UpdateMaintenanceAgreement(MaintenanceAgreement maintenanceAgreement)
        {
            _maintenanceRepository.Update(maintenanceAgreement);
            await _maintenanceRepository.Save();
            return Ok(maintenanceAgreement);
        }

        [HttpDelete("maintenance-agreement/{id}")]
        public async Task<IActionResult> DeleteMaintenanceAgreement(long id)
        {
            _maintenanceRepository.Delete(id);
            await _maintenanceRepository.Save();
            return NoContent();
        }

        //Maintenance Schedules        
        [HttpGet("maintenance-agreement-schedule/{id}")]
        public async Task<IActionResult> GetMaintenanceScheduleByAgreementId(long id)
        {
            var schedules = await _maintenanceScheduleRepository.GetByAgreementId(id);
            return Ok(schedules);
        }
    }
}
