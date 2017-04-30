using System;
using System.Collections.Generic;

namespace Cinder.Services.Models
{
    public class MatchStatus {
        public int Status { get; set; }

        public List<Match> Results { get; set; }
    }
    public class Match
    {
        public int distance_mi { get; set; }
        public int connection_count { get; set; }
        public string content_hash { get; set; }
        public string _id { get; set; }
        public string bio { get; set; }
        public DateTime birth_date { get; set; }
        public string name { get; set; }
        public DateTime ping_time { get; set; }
        public IList<School> schools { get;set;}
        public IList<Photo> photos { get; set; }
        public int s_number { get; set; }
        public int gender { get; set; }
    }

    public class Photo
    {
        public string id { get; set; }

        public string url { get; set; }

        public IList<ProcessedFile> processedFiles { get; set; }
    }

    public class School
    {
        public string id { get; set; }
        public string name { get; set; }
    }

    public class ProcessedFile
    {
        public int width { get; set; }
        public int height { get; set; }
        public string url { get; set; }
    }
}
