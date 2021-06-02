using Microsoft.AspNetCore.Mvc;
using MusicBud.Models;
using MusicBud.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicBud.Controllers
{
    public class RatingsController : Controller
    {

        private readonly IRatingService _ratingService;

        public RatingsController(IRatingService ratingService)
        {
            _ratingService = ratingService;
        }

        // in cazul in care vreau sa mai fac si pagina asta
        public IActionResult Stats()
        {
            return View();
        }

        // POST: Ratings/SubmitFeedBack
        [HttpPost]
        public async Task<IActionResult> SubmitFeedBack([FromBody] Rating rating)
        {
            try
            {
                await _ratingService.CreateRating(rating);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
