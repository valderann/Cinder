//import {ApiClient} from "./APiClient";
//import RequestOptions from "./RequestOptions";

module Scripts.Core {
    export class JQueryApiClient implements ApiClient {
        constructor() {

        }

        private convertToPostParam(urlParams: any) {
            var urlParamsString = "";
            if (!urlParams) return null;
            for (var i = 0; i < urlParams.length; i++) {
                if (urlParamsString !== "") { urlParamsString += "&"; }
                urlParamsString += urlParams[i][0] + "=" + encodeURIComponent(urlParams[i][1]);
            }
            return urlParamsString;
        }

        private convertToFormData(urlParams: any) {
            if (!urlParams) return null;
            var formData = new FormData();
            for (var i = 0; i < urlParams.length; i++) {
                formData.append(urlParams[i][0], urlParams[i][1]);
            }
            return formData;
        }

        public get(url: string, onSuccess: any, onFailure: any) {
            var options = new RequestOptions();
            options.url = url;
            options.onSuccess = onSuccess;
            options.onFailure = onFailure;
            options.requestType = "GET";

            this.doRequest(options);
        }


        public post(url: string, urlParams: any, onSuccess: any, onFailure?: any, onProgress?: any) {
            var options = new RequestOptions();
            options.url = url;
            options.data = this.convertToFormData(urlParams);
            options.onSuccess = onSuccess;
            options.onFailure = onFailure;
            options.requestType = "POST";
            options.onProgress = onProgress;

            this.doRequest(options);
        }


        public delete(url: string, urlParams: any, onSuccess: any, onFailure?: any) {
            var options = new RequestOptions();
            options.url = url;
            options.data = this.convertToFormData(urlParams);
            options.onSuccess = onSuccess;
            options.onFailure = onFailure;
            options.requestType = "DELETE";

            this.doRequest(options);
        }

        private doRequest(options: RequestOptions) {
            $.ajax(options.url, {
                xhr: () => {
                    var xhrobj = $.ajaxSettings.xhr();
                    if (xhrobj.upload && options.onProgress) {
                        xhrobj.upload.addEventListener('progress', (event) => {
                            let percent = 0;
                            var position = event.loaded || event.position;
                            var total = event.total;
                            if (event.lengthComputable) {
                                percent = Math.ceil(position / total * 100);
                                options.onProgress(percent);
                            }

                        }, false);
                    }
                    return xhrobj;
                },
                headers: {
                    'X-Auth-Token': window.localStorage.getItem("tinderToken")
                },
                dataType: "json",
                data: options.data,
                cache: false,
                type: options.requestType,
                contentType: false,
                processData: false,
                success: (data) => {
                    if (options.onSuccess) { options.onSuccess(data); }
                },
                error: (data) => {
                    if (options.onFailure) { options.onFailure(data); }
                }
            });
        }
    }
}