var Scripts;
(function (Scripts) {
    var Core;
    (function (Core) {
        var TinderApi = (function () {
            function TinderApi(client) {
                this._rootUrl = "/Api/";
                this._client = client;
            }
            TinderApi.prototype.getMatches = function (successFunc) {
                this._client.get(this._rootUrl + "matches", function (data) {
                    successFunc(data);
                }, function () { });
            };
            TinderApi.prototype.setLocation = function (lat, long) {
                this._client.post(this._rootUrl + "ping", [["lat", lat], ["lon", long]], function (data) {
                });
            };
            TinderApi.prototype.likeMatch = function (userId) {
                this._client.post(this._rootUrl + "like/" + userId, null, function (data) {
                });
            };
            TinderApi.prototype.passMatch = function (userId) {
                this._client.post(this._rootUrl + "pass/" + userId, null, function (data) {
                });
            };
            return TinderApi;
        }());
        Core.TinderApi = TinderApi;
    })(Core = Scripts.Core || (Scripts.Core = {}));
})(Scripts || (Scripts = {}));
