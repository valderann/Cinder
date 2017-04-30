using System.Threading.Tasks;
using Cinder.Services.Models;

namespace Cinder.Services
{
    public class TinderApiService
    {
        private string _authenticationToken = "";
        private TinderApiRequestSender _apiRequestSender = new TinderApiRequestSender(new ApiRequestSender());
        public TinderApiService(string authenticationToken)
        {
            _authenticationToken = authenticationToken;
            _apiRequestSender.SetToken(authenticationToken);
        }     
        
        public async Task<AuthenticatedModel> Authenticate(string facebookId, string facebookToken)
        {
            var authenticationJson = new { facebook_id = facebookId, facebook_token = facebookToken };
            var model = await _apiRequestSender.Post<AuthenticatedModel>("auth", authenticationJson);
            return model;
        }

        public async Task Ping(string lat, string lon)
        {
            var positionJson = new { lat = lat, lon = lon };
            var model = await _apiRequestSender.Post<AuthenticatedModel>("user/ping", positionJson);
        }

        public async Task<MatchStatus> GetMatches(int limit = 10)
        {
            var limitJson = new { limit = limit };
            return await _apiRequestSender.Post<MatchStatus>("user/recs", limitJson);
        }

        public async Task Like(string userId)
        {
            var model = await _apiRequestSender.Get<AuthenticatedModel>($"like/{userId}");
        }

        public async Task Pass(string userId)
        {
            var model = await _apiRequestSender.Get<AuthenticatedModel>($"pass/{userId}");
        }

        public async Task User(string userId)
        {
            await _apiRequestSender.Get<object>($"/user/{userId}");
        }

        public async Task GetFacebookFriends(string userId)
        {
            await _apiRequestSender.Get<object>($"/group/friends");
        }
    }
}
