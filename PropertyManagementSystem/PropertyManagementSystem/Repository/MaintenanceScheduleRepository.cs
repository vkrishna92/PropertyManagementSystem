using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PropertyManagementSystem.DataAccess;
using PropertyManagementSystem.DTOs;
using PropertyManagementSystem.Interfaces;
using PropertyManagementSystem.Models;

namespace PropertyManagementSystem.Repository
{
	public class MaintenanceScheduleRepository: IMaintenanceScheduleRepository
	{
        private readonly DataContext _dataContext;
        public MaintenanceScheduleRepository(DataContext dataContext)
		{
            _dataContext = dataContext;
		}

        public void Delete(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<MaintenanceSchedule>> GenerateScheduleByAgreementId(long agreementId)
        {
            //retrieve maintenance agreement for the apartment
            var agreement = await _dataContext.MaintenanceAgreements
                .FirstOrDefaultAsync(a => a.Id == agreementId && a.IsDisabled == false);
            List<MaintenanceSchedule> schedules = new List<MaintenanceSchedule>();
            if(agreement != null)
            {
                var fromDate = agreement.FromDate;
                var toDate = agreement.ToDate;
                for (DateTime i = new DateTime(fromDate.Year,fromDate.Month,1); i <= toDate; i = i.AddMonths(1))
                {
                    MaintenanceSchedule schedule = new MaintenanceSchedule();
                    schedule.PeriodStartDate = i;
                    schedule.PeriodEndDate = i.AddMonths(1).AddDays(-1);
                    schedule.Id = 0;
                    schedule.MaintenanceAgreement = agreement;
                    schedule.MaintenanceAmount = agreement.MaintenanceAmount;
                    schedule.MaintenanceAgreementId = agreement.Id;
                    schedule.Status = false;
                    schedule.TransDate = i;
                    schedules.Add(schedule);
                }                
            }
            return schedules;
        }

        public async Task<List<MaintenanceSchedule>> GetAll(PaginationParameters parameters)
        {
            var schedules = await _dataContext.MaintenanceSchedules.Skip((parameters.PageNumber - 1) * parameters.PageSize)
                .Take(parameters.PageSize).ToListAsync();
            return schedules;
        }

        public async Task<List<MaintenanceSchedule>> GetByAgreementId(long agreementId)
        {
            var agreement = await _dataContext.MaintenanceAgreements.FirstOrDefaultAsync(a => a.Id == agreementId);
            var schedules = new List<MaintenanceSchedule>();
            if(agreement!= null && !agreement.IsDisabled)
            {
                schedules = await _dataContext.MaintenanceSchedules
                    .Where(s => s.MaintenanceAgreementId == agreementId)
                    .ToListAsync();

            }
            return schedules;
        }

        public async Task<MaintenanceSchedule> GetById(long id)
        {
            var maintenanceSchedule = await _dataContext.MaintenanceSchedules
                                                        .Include(m => m.MaintenanceAgreement)
                                                        .FirstOrDefaultAsync(m => m.Id == id);
            return maintenanceSchedule;
        }

        public async void Insert(MaintenanceSchedule obj)
        {
            var agreement = await _dataContext.MaintenanceAgreements
                .FirstOrDefaultAsync(x => x.Id == obj.MaintenanceAgreementId && x.IsDisabled == false);
            if(agreement != null)
            {
                obj.MaintenanceAgreement = agreement;
                _dataContext.MaintenanceSchedules.Add(obj);
            }
        }

        public async Task Save()
        {
            await _dataContext.SaveChangesAsync();
        }

        public void Update(MaintenanceSchedule obj)
        {
            throw new NotImplementedException();
        }
    }
}

