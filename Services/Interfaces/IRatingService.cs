using MusicBud.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicBud.Services.Interfaces
{
    public interface IRatingService
    {
        public Task<List<Rating>> GetAllRatings();
        public Task<Rating> GetRatingById(Guid? id);
        public Task<bool> CreateRating(Rating rating);
        public bool RatingExists(Guid id);


    }
}
