using System;

namespace Cinder.Services.Models
{
    public class AuthenticatedModel
    {
        public string token { get; set; }
        public UserModel user { get; set; }
    }

    public class UserModel
    {
        public string _id { get; set; }
        DateTime active_time { get; set; }
        bool can_create_squad { get; set; }
        DateTime create_date { get; set; }
        int age_filter_max { get; set; }
        int age_filter_min { get; set; }
        string api_token { get; set; }
        string bio { get; set; }
        DateTime birth_date { get; set; }
        int connection_count { get; set; }
        int distance_filter { get; set; }
        string full_name { get; set; }
    }
}
