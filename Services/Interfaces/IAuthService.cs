using Microsoft.AspNetCore.Identity;
using MusicBud.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicBud.Services.Interfaces
{
    public interface IAuthService
    {
        public User CreateUser(string username, string email, DateTime birthdate, string gender, string city, string country);
        public Task<SignInResult> Login(string username, string password, bool rememberMe, bool lockoutOnFailure);
        public Task<IdentityResult> Register(User user, string password);
        public Task Logout();
    }
}
