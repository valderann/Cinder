var Scripts;
(function (Scripts) {
    var Core;
    (function (Core) {
        var TinderAuthenticator = (function () {
            function TinderAuthenticator(client) {
                this._rootUrl = "/Api/";
                this._client = client;
            }
            TinderAuthenticator.prototype.authenticate = function (facebookId, facebookAccessToken, successFunc) {
                this._client.post(this._rootUrl + "Authenticate", [["facebookId", facebookId], ["authenticationToken", facebookAccessToken]], function (data) {
                    window.localStorage.setItem("tinderToken", data.token);
                });
            };
            TinderAuthenticator.prototype.getAccessToken = function () {
                return window.localStorage.getItem("tinderToken");
            };
            return TinderAuthenticator;
        }());
        Core.TinderAuthenticator = TinderAuthenticator;
    })(Core = Scripts.Core || (Scripts.Core = {}));
})(Scripts || (Scripts = {}));
