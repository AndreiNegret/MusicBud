﻿using AspNetCore.ReCaptcha;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MusicBud.Areas.Identity.Pages.Account;
using MusicBud.Models;
using MusicBud.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace MusicBud.Controllers
{
    public class HomeController : Controller
    {
        private readonly ISpotifyService _spotifyService;

        public HomeController(ISpotifyService spotifyService)
        {
            _spotifyService = spotifyService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> Release()
        {
            var newReleases = await GetReleases();

            return View(newReleases);
        }

        private async Task<IEnumerable<Release>> GetReleases()
        {
            try
            {
                var newReleases = await _spotifyService.GetNewReleases("RO", 20);

                return newReleases;
            }
            catch (Exception ex)
            {
                Debug.Write(ex);

                return Enumerable.Empty<Release>();
            }
        }

        //[Authorize]
        public IActionResult About()
        {
            return View();
        }


        public IActionResult Contact()
        {
            return View();
        }

        [ValidateReCaptcha]
        [HttpPost]
        public IActionResult Register(RegisterModel registerModel)
        {
            if (!ModelState.IsValid)
                return View("Index");

            TempData["Message"] = "Your form has been sent!";
            return RedirectToAction("Index");
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
