using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicBud.Models
{
    public class User : IdentityUser
    {
        public string UserPhoto { get; set; }
        public DateTime Birthdate { get; set; }
        public string Gender { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
    }
}
