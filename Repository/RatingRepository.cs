using MusicBud.Data;
using MusicBud.Models;
using MusicBud.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicBud.Repository
{
    public class RatingRepository : RepositoryBase<Rating>, IRatingRepository
    {
        public RatingRepository(ApplicationDbContext repositoryContext)
          : base(repositoryContext)
        {
        }
    }
}
