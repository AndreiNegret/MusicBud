using MusicBud.Data;
using MusicBud.Models;
using MusicBud.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicBud.Repository
{
    public class PlaylistEmotionRepository : RepositoryBase<PlaylistEmotion>, IPlaylistEmotionRepository
    {
        public PlaylistEmotionRepository(ApplicationDbContext repositoryContext)
          : base(repositoryContext)
        {
        }
    }
}
