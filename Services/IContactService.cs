using MusicBud.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicBud.Services
{
    public interface IContactService
    {
        public Task<List<Contact>> GetAllContact();
        public Task<Contact> GetContactById(Guid? id);
        public Task<bool> UpdateContact(Guid id, Contact contact);
        public Task<bool> CreateContact(Contact contact);
        public Task<bool> DeleteContact(Guid id);
        public bool ContactExists(Guid id);
    }
}
