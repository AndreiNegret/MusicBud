using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicBud.Models
{
    public class Contact
    {
        public Guid ContactID { get; set; }
        public string Option { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; } /// trebuie ?
        public string Message { get; set; } 

    }
}
