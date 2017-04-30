using System.Collections.Generic;
using System.Threading.Tasks;
using Cinder.Services.Models;

namespace Cinder.Services
{
    public class TinderApiRequestSender
    {
        private readonly ApiRequestSender _apiRequestSender;
        private string _authenticationToken;

        public TinderApiRequestSender(ApiRequestSender apiRequestSender)
        {
            _apiRequestSender = apiRequestSender;
        }

        private const string ApiUrl = "https://api.gotinder.com";
        private const string UserAgent = "Tinder Android Version 6.4.1";

        private Dictionary<string, string> _headers = new Dictionary<string, string>()
        {
            {"Content-Type","application/json; charset=utf-8"},
            {"User-Agent", UserAgent},
            {"Host", ApiUrl },
            {"os_version","1935"},
            {"Accept-Encoding","gzip"},
            {"app-version","371"},
            {"platform", "android"}
        };

        public void SetToken(string authenticationToken)
        {
            _authenticationToken = authenticationToken;
        }

        public async Task<T> Get<T>(string url)
        {
            return await _apiRequestSender.DoRequest<T>(HttpMethod.GET, GetAbsoluteUrl(url), null, GetAllHeaders());
        }

        public async Task<T> Post<T>(string url, object data)
        {
            return await _apiRequestSender.DoRequest<T>(HttpMethod.POST, GetAbsoluteUrl(url), data, GetAllHeaders());
        }

        private string GetAbsoluteUrl(string url)
        {
            return $"{ApiUrl}/{url}";
        }

        private Dictionary<string, string> GetAllHeaders()
        {
            var headers = new Dictionary<string, string>();
            foreach (var header in _headers)
            {
                headers.Add(header.Key, header.Value);
            }

            if (!string.IsNullOrEmpty(_authenticationToken)) headers.Add("X-Auth-Token", _authenticationToken);

            return headers;
        }
    }
}
