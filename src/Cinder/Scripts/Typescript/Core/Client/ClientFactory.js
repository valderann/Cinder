//import JQueryApiClient from "../Client/JqueryClient.ts";
//import {ApiClient} from "../Client/APiClient.ts";
var Scripts;
(function (Scripts) {
    var Core;
    (function (Core) {
        var ClientFactory = (function () {
            function ClientFactory() {
            }
            ClientFactory.getClient = function () {
                return new Core.JQueryApiClient();
            };
            return ClientFactory;
        }());
        Core.ClientFactory = ClientFactory;
    })(Core = Scripts.Core || (Scripts.Core = {}));
})(Scripts || (Scripts = {}));
