using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicBud.Models
{
    public class Rating
    {
        public Guid RatingId { get; set; }
        public string Action { get; set; }
        public string Username { get; set; }
        public string Emotion { get; set; }
    }
}
