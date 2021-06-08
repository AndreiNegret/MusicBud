using Microsoft.Extensions.Configuration;
using MusicBud.Models;
using MusicBud.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;

namespace MusicBud.Services
{
    public class SpotifyService : ISpotifyService
    {
        private readonly HttpClient _httpClient;
        private readonly ISpotifyAccountService _spotifyAccountService;
        private readonly IConfiguration _config;
        private string _token = null;

        public SpotifyService(
            HttpClient httpClient,
            ISpotifyAccountService spotifyAccountService,
            IConfiguration config)
        {
            _httpClient = httpClient;
            _spotifyAccountService = spotifyAccountService;
            _config = config;
        }

        private async Task SetToken()
        {
            var token = await _spotifyAccountService.GetToken(_config["Spotify:ClientId"], _config["Spotify:ClientSecret"]);
            _token = token;
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _token);
        }


        public async Task<IEnumerable<Release>> GetNewReleases(string countryCode, int limit)
        {
            if (_token == null)
            {
                await SetToken();
            }

            var response = await _httpClient.GetAsync($"browse/new-releases?country={countryCode}&limit={limit}");

            response.EnsureSuccessStatusCode();

            using var responseStream = await response.Content.ReadAsStreamAsync();
            var responseObject = await JsonSerializer.DeserializeAsync<GetNewReleaseResult>(responseStream);

            return responseObject?.albums?.items.Select(i => new Release
            {
                Name = i.name,
                Date = i.release_date,
                ImageUrl = i.images.FirstOrDefault().url,
                Link = i.external_urls.spotify,
                Artists = string.Join(",", i.artists.Select(i => i.name))
            });
        }

        public async Task<IEnumerable<Track>> GetPlaylistTracks(string playlistId)
        {
            if (_token == null)
            {
                await SetToken();
            }

            try
            {

                var response = await _httpClient.GetAsync($"playlists/{playlistId}/tracks");

                response.EnsureSuccessStatusCode();

                using var responseStream = await response.Content.ReadAsStreamAsync();
                var responseObject = await JsonSerializer.DeserializeAsync<PlaylistResult>(responseStream);
                return responseObject?.items.Select(item => item.track);
            } catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
