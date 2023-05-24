using System.Text.Json;
using System.Text.Json.Serialization;

namespace CrudApp.Models
{
    public class Blog
    {
        public int? ID { get; set; }
        [JsonPropertyName("title")]
        public string Title { get; set; }
        [JsonPropertyName("url")]
        public string Url { get; set; }
        [JsonPropertyName("rating")]
        public int Rating { get; set; }
        [JsonPropertyName("posts")]
        public List<Post>? Posts { get; set; }
    }

    public class Post
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }

        public int BlogId { get; set; }
        [JsonIgnore]
        public Blog? Blog { get; set; }
    }
}
