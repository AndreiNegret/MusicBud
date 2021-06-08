using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MusicBud.Models;
using MusicBud.Repository.Interfaces;
using MusicBud.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace MusicBud.Controllers
{
    public class RatingsController : Controller
    {
        private readonly IRatingService _ratingService;
        private readonly ISpotifyService _spotifyService;
        private readonly IPlaylistEmotionRepository _playlistEmotionRepo;

        public RatingsController(IRatingService ratingService,
                                 ISpotifyService spotifyService,
                                 IPlaylistEmotionRepository playlistEmotionRepo)
        {
            _spotifyService = spotifyService;
            _ratingService = ratingService;
            _playlistEmotionRepo = playlistEmotionRepo;
        }

        // in cazul in care vreau sa mai fac si pagina asta
        public IActionResult Stats()
        {
            return View();
        }

        private async Task<Track> PickTrack(string playlistId)
        {
            try
            {
                var tracks = await _spotifyService.GetPlaylistTracks(playlistId);

                var pickedTrack = Utils.PickSong(Utils.ShuffleList(tracks));

                return pickedTrack;
            }
            catch (Exception ex)
            {
                Debug.Write(ex);

                return null;
            }
        }

        public PlaylistEmotion GetPlaylistIdByEmotion(string emotion)
        {
            try
            {
                return _playlistEmotionRepo.FindByCondition(playlistEmotionEntry => playlistEmotionEntry.Emotion == emotion).First();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.ToString());
            }
        }

        // POST: Ratings/SubmitFeedBack
        [HttpPost]
        public async Task<IActionResult> SubmitFeedBack([FromBody] Rating rating)
        {
            try
            {
                await _ratingService.CreateRating(rating);

                var playlistEmotionEntry = GetPlaylistIdByEmotion(rating.Emotion);

                var track = await PickTrack(playlistEmotionEntry.Playlist);
                return Ok(Utils.ToJson(track)); 
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
