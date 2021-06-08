using Microsoft.EntityFrameworkCore;
using MusicBud.Models;
using MusicBud.Repository.Interfaces;
using MusicBud.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicBud.Services
{
    public class RatingService : IRatingService
    {
        private readonly IRatingRepository _ratingRepository;

        public RatingService(IRatingRepository ratingRepository)
        {
            _ratingRepository = ratingRepository;
        }

        public async Task<bool> CreateRating(Rating rating)
        {
            try
            {
                _ratingRepository.Create(rating);
                await _ratingRepository.SaveAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.ToString());
            }
        }


        public Task<List<Rating>> GetAllRatings()
        {
            try
            {
                return _ratingRepository.FindAll().OrderByDescending(rating => rating.RatingId).ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.ToString());
            }
        }

        public Task<Rating> GetRatingById(Guid? id)
        {
            try
            {
                return _ratingRepository.FindByCondition(rating => rating.RatingId == id).FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.ToString());
            }
        }


        public bool RatingExists(Guid id)
        {
            return _ratingRepository.FindByCondition(e => e.RatingId == id).Any();
        }
    }
}
