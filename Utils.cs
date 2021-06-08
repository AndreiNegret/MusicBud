using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicBud
{
    public class Utils
    {
        public static string ToJson(object obj)
        {
            DefaultContractResolver contractResolver = new DefaultContractResolver
            {
                NamingStrategy = new CamelCaseNamingStrategy()
            };

            string json = JsonConvert.SerializeObject(obj, new JsonSerializerSettings
            {
                ContractResolver = contractResolver,
                Formatting = Formatting.Indented
            });

            return json;
        }

        public static T PickSong<T>(IEnumerable<T> songs)
        {
            Random random = new Random(DateTime.Now.Millisecond);
            return songs.ElementAt(random.Next(0, songs.Count()));
        }

        public static IEnumerable<T> ShuffleList<T>(IEnumerable<T> list)
        {
            var arr = list.ToArray();
            Random rand = new Random();
            for (int currentIndex = arr.Length - 1; currentIndex > 0; currentIndex--)
            {
                int nextIndex = rand.Next(currentIndex + 1);
                Swap(arr, currentIndex, nextIndex);
            }
            return arr.ToList();
        }

        private static void Swap<T>(IList<T> array, int firstIndex, int secondIndex)
        {
            T temp = array[secondIndex];
            array[secondIndex] = array[firstIndex];
            array[firstIndex] = temp;
        }
    }
}
