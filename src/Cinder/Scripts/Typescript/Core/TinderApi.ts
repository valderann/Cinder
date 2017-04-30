module Scripts.Core {
    export class TinderApi {
        private _client: ApiClient;
        private _rootUrl: string = "/Api/";

        constructor(client: ApiClient) {
            this._client = client;
        }

        public getMatches(successFunc: (data) => void) {
            this._client.get(this._rootUrl + "matches", (data) => {
                successFunc(data);
            }, () => { });
        }

        public setLocation(lat, long) {
            this._client.post(this._rootUrl + "ping", [["lat", lat], ["lon", long]], (data) => {

            });
        }

        public likeMatch(userId) {
            this._client.post(this._rootUrl + "like/" + userId, null, (data) => {

            });
        }

        public passMatch(userId) {
            this._client.post(this._rootUrl + "pass/" + userId, null, (data) => {

            });
        }
    }
}

