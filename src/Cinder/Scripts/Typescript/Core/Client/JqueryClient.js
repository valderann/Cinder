//import {ApiClient} from "./APiClient";
//import RequestOptions from "./RequestOptions";
var Scripts;
(function (Scripts) {
    var Core;
    (function (Core) {
        var JQueryApiClient = (function () {
            function JQueryApiClient() {
            }
            JQueryApiClient.prototype.convertToPostParam = function (urlParams) {
                var urlParamsString = "";
                if (!urlParams)
                    return null;
                for (var i = 0; i < urlParams.length; i++) {
                    if (urlParamsString !== "") {
                        urlParamsString += "&";
                    }
                    urlParamsString += urlParams[i][0] + "=" + encodeURIComponent(urlParams[i][1]);
                }
                return urlParamsString;
            };
            JQueryApiClient.prototype.convertToFormData = function (urlParams) {
                if (!urlParams)
                    return null;
                var formData = new FormData();
                for (var i = 0; i < urlParams.length; i++) {
                    formData.append(urlParams[i][0], urlParams[i][1]);
                }
                return formData;
            };
            JQueryApiClient.prototype.get = function (url, onSuccess, onFailure) {
                var options = new Core.RequestOptions();
                options.url = url;
                options.onSuccess = onSuccess;
                options.onFailure = onFailure;
                options.requestType = "GET";
                this.doRequest(options);
            };
            JQueryApiClient.prototype.post = function (url, urlParams, onSuccess, onFailure, onProgress) {
                var options = new Core.RequestOptions();
                options.url = url;
                options.data = this.convertToFormData(urlParams);
                options.onSuccess = onSuccess;
                options.onFailure = onFailure;
                options.requestType = "POST";
                options.onProgress = onProgress;
                this.doRequest(options);
            };
            JQueryApiClient.prototype.delete = function (url, urlParams, onSuccess, onFailure) {
                var options = new Core.RequestOptions();
                options.url = url;
                options.data = this.convertToFormData(urlParams);
                options.onSuccess = onSuccess;
                options.onFailure = onFailure;
                options.requestType = "DELETE";
                this.doRequest(options);
            };
            JQueryApiClient.prototype.doRequest = function (options) {
                $.ajax(options.url, {
                    xhr: function () {
                        var xhrobj = $.ajaxSettings.xhr();
                        if (xhrobj.upload && options.onProgress) {
                            xhrobj.upload.addEventListener('progress', function (event) {
                                var percent = 0;
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
                    success: function (data) {
                        if (options.onSuccess) {
                            options.onSuccess(data);
                        }
                    },
                    error: function (data) {
                        if (options.onFailure) {
                            options.onFailure(data);
                        }
                    }
                });
            };
            return JQueryApiClient;
        }());
        Core.JQueryApiClient = JQueryApiClient;
    })(Core = Scripts.Core || (Scripts.Core = {}));
})(Scripts || (Scripts = {}));
