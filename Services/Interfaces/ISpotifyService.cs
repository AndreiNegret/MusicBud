using MusicBud.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicBud.Services.Interfaces
{
    public interface ISpotifyService
    {
        Task<IEnumerable<Release>> GetNewReleases(string countryCode, int limit);
        Task<IEnumerable<Track>> GetPlaylistTracks(string playlistId);
    }
}
