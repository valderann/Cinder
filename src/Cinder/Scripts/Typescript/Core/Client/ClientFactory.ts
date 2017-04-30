//import JQueryApiClient from "../Client/JqueryClient.ts";
//import {ApiClient} from "../Client/APiClient.ts";

module Scripts.Core {
    export class ClientFactory {
        public static getClient(): ApiClient {
            return new JQueryApiClient();
        }
    }
}