using Microsoft.AspNetCore.Identity;

namespace PropertyManagementSystem.Models
{
    public class AppUser: IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DisplayName { get; set; }
    }
}
