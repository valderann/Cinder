module Scripts.Core {
    export class TinderAuthenticator {

        private _client: ApiClient;
        private _rootUrl: string = "/Api/";

        constructor(client: ApiClient) {
            this._client = client;
        }

        public authenticate(facebookId: string, facebookAccessToken: string, successFunc: (token: string) => void) {

            this._client.post(this._rootUrl + "Authenticate", [["facebookId", facebookId], ["authenticationToken", facebookAccessToken]], (data) => {
                window.localStorage.setItem("tinderToken", data.token);
            });
        }

        public getAccessToken(): string {
            return window.localStorage.getItem("tinderToken");
        }
    }
}