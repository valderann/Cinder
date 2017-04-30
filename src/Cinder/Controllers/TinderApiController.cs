
using System;
using System.Threading.Tasks;
using Cinder.Services;
using Microsoft.AspNetCore.Mvc;

namespace Cinder.Controllers
{
    [Route("api")]
    public class TinderApiController : Controller
    {
        [HttpPost("Authenticate")]
        public async Task<IActionResult> Authenticate(string facebookId, string authenticationToken)
        {
            if (string.IsNullOrEmpty(facebookId) || string.IsNullOrEmpty(authenticationToken)) throw new ArgumentNullException();

            var model = await GetTinderApiService().Authenticate(facebookId, authenticationToken);
            return Ok(model);
        }

        [HttpPost("ping")]
        public async Task<IActionResult> Ping(string lat, string lon)
        {
            await GetTinderApiService().Ping(lat, lon);
            return Ok();
        }

        [HttpGet("matches")]
        public async Task<IActionResult> GetMatches()
        {
            var matches = await GetTinderApiService().GetMatches();
            return Ok(matches);
        }

        [HttpPost("like/{userId}")]
        public async Task<IActionResult> Like(string userId)
        {
            await GetTinderApiService().Like(userId);
            return Ok();
        }

        [HttpPost("pass/{userId}")]
        public async Task<IActionResult> Pass(string userId)
        {
            await GetTinderApiService().Pass(userId);
            return Ok();
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUser(string userId)
        {
            await GetTinderApiService().User(userId);
            return Ok();
        }

        private TinderApiService GetTinderApiService()
        {
            var token = Request.Headers["X-Auth-Token"];
            if (token == "null") token = string.Empty;
            return new TinderApiService(token);
        }
    }
}
