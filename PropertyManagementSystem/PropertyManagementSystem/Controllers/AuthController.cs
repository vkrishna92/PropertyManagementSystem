using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
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
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IAuthRepository _authRepository;
        public AuthController(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager,IAuthRepository authRepository)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _authRepository = authRepository;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register(AppUserDto userDto)
        {
            int emailIndex = userDto.Email.IndexOf('@');
            string username = userDto.Email.Remove(emailIndex);
            var userDb = await _userManager.FindByEmailAsync(userDto.Email);
            if (userDb != null)
                return BadRequest("User already exists.");
            var user = new AppUser()
            {
                FirstName = userDto.FirstName,
                LastName = userDto.LastName,
                DisplayName = string.Format("{0},{1}", userDto.FirstName, userDto.LastName),
                PhoneNumber = userDto.Phone,
                Email = userDto.Email,                
                UserName = username               
            };
            try
            {
                var res = await _userManager.CreateAsync(user, userDto.Password);
                await _userManager.AddToRoleAsync(user, userDto.Role);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }            
        }

        [HttpPost("login")]
        public async Task<IActionResult> login(LoginDto loginDto)
        {
            string token = await _authRepository.login(loginDto);
            if (token == String.Empty || token.Length == 0)
                return Unauthorized();
            else
                return Ok(new Tokens() { Token = token });
        }
        [HttpPost("addRole")]        
        public async Task<IActionResult> addRole(IdentityRole role)
        {

            IdentityRole idRole = new IdentityRole() { Name = role.Name, NormalizedName = role.NormalizedName };
            await _roleManager.CreateAsync(idRole);

            return Ok(idRole);
        }

        [HttpGet("getUserById/{userId}")]
        public async Task<IActionResult> getUserById(string userId)
        {            
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return NotFound();
            AppUserDto appUserDto = new AppUserDto();
            appUserDto.Id = userId;
            appUserDto.Email = user.Email;
            appUserDto.UserName = user.UserName;
            appUserDto.FirstName = user.FirstName;
            appUserDto.LastName = user.LastName;
            appUserDto.Phone = user.PhoneNumber;            
            return Ok(user);
        }

        [HttpGet("getUserByEmail/{email}")]
        public async Task<IActionResult> getUserByEmail(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return NotFound();
            AppUserDto appUserDto = new AppUserDto();
            appUserDto.Id = user.Id;
            appUserDto.Email = user.Email;
            appUserDto.UserName = user.UserName;
            appUserDto.FirstName = user.FirstName;
            appUserDto.LastName = user.LastName;
            appUserDto.Phone = user.PhoneNumber;
            return Ok(user);
        }

    }
}
