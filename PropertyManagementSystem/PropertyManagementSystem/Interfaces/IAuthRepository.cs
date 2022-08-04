using PropertyManagementSystem.DTOs;
using PropertyManagementSystem.Models;
using System;
using System.Threading.Tasks;

namespace PropertyManagementSystem.Interfaces
{
    public interface IAuthRepository
    {
        public Task<Boolean> registerUser(AppUserDto appUserDto);
        public Task<string> login(LoginDto loginDto);
        public Task<AppUser> getUserById(string userId);
    }
}
