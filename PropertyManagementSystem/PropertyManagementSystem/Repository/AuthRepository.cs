using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using PropertyManagementSystem.DTOs;
using PropertyManagementSystem.Interfaces;
using PropertyManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace PropertyManagementSystem.Repository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IConfiguration _config;
        public AuthRepository(UserManager<AppUser> userManager, IConfiguration config)
        {
            _userManager = userManager;
            _config = config;
        }
        public Task<AppUser> getUserById(string userId)
        {
            throw new System.NotImplementedException();
        }

        public async Task<string> login(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.UserName);
            if (user != null && await _userManager.CheckPasswordAsync(user, loginDto.Password))
            {
                // Get roles assigned to user
                var roles = await _userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.UserName),
                };
                foreach (var r in roles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, r));
                }
                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(authClaims),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha512Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }
            else
            {
                return "";
            }
        }

        public Task<bool> registerUser(AppUserDto appUserDto)
        {
            throw new System.NotImplementedException();
        }
    }
}
