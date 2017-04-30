var Scripts;
(function (Scripts) {
    var Core;
    (function (Core) {
        var Lightbox = (function () {
            function Lightbox() {
            }
            Lightbox.prototype.detectHistoryState = function () {
                return (window.history && window.history.pushState);
            };
            Lightbox.prototype.createLightboxElement = function () {
                var divLightboxOverlay = document.createElement("div");
                divLightboxOverlay.id = "dvLightbox_overlay";
                $(divLightboxOverlay).click(this.closeLightbox);
                $("body").append(divLightboxOverlay);
                var lightboxContainer = document.createElement("div");
                lightboxContainer.id = "dvLightbox_container";
                lightboxContainer.style.width = "100%";
                $("body").append(lightboxContainer);
                var divLightbox = document.createElement("div");
                divLightbox.id = "dvLightbox_content";
                $("#dvLightbox_container").append(divLightbox);
            };
            Lightbox.prototype.openLightbox = function (value) {
                if (!document.getElementById("dvLightbox_overlay")) {
                    this.createLightboxElement();
                }
                var lightboxContent = document.getElementById("dvLightbox_content");
                $(lightboxContent).attr("data-top", $(window).scrollTop());
                var closeFuncPntr = this.closeLightbox;
                $("html").addClass('lightbox');
                //Mobile lightbox
                if ($(lightboxContent).width() >= $(window).width()) {
                    if (this.detectHistoryState()) {
                        history.pushState(null, null, "");
                        $(window).bind('popstate', function () {
                            event.preventDefault();
                            closeFuncPntr();
                        });
                    }
                }
                else {
                }
                var marginTop = ($(window).height() - $(lightboxContent).height()) / 4;
                $(lightboxContent).css("top", (marginTop + $(window).scrollTop()) + "px");
                $("#dvLightbox_overlay").show();
                var closeButton = document.createElement("div");
                closeButton.id = "lightboxCloseButton";
                closeButton.innerText = "x";
                closeButton.title = "close";
                lightboxContent.appendChild(closeButton);
                lightboxContent.appendChild(value);
                $(lightboxContent).show();
                $("#lightboxCloseButton").click(function () {
                    closeFuncPntr();
                });
                var self = this;
                $(document).on('keyup', function (evt) {
                    if (evt.keyCode == 27) {
                        closeFuncPntr();
                    }
                });
            };
            Lightbox.prototype.closeLightbox = function () {
                var lightboxContent = $("#dvLightbox_content");
                $("html").removeClass('lightbox');
                if ($(lightboxContent).width() >= $(window).width()) {
                    window.scrollTo(0, parseInt($(lightboxContent).attr("data-top")));
                }
                $("#dvLightbox_overlay").fadeOut('fast');
                $(lightboxContent).fadeOut('fast', function () {
                    $(lightboxContent).html("");
                });
                $(document).off('keyup');
            };
            return Lightbox;
        }());
        Core.Lightbox = Lightbox;
    })(Core = Scripts.Core || (Scripts.Core = {}));
})(Scripts || (Scripts = {}));
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
var Scripts;
(function (Scripts) {
    var Core;
    (function (Core) {
        var RequestOptions = (function () {
            function RequestOptions() {
            }
            return RequestOptions;
        }());
        Core.RequestOptions = RequestOptions;
    })(Core = Scripts.Core || (Scripts.Core = {}));
})(Scripts || (Scripts = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxpZ2h0Ym94LnRzIiwiVGluZGVyQXBpLnRzIiwiVGluZGVyQXV0aGVudGljYXRvci50cyIsIkNsaWVudC9DbGllbnRGYWN0b3J5LnRzIiwiQ2xpZW50L0pxdWVyeUNsaWVudC50cyIsIkNsaWVudC9SZXF1ZXN0T3B0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFPLE9BQU8sQ0ErRmI7QUEvRkQsV0FBTyxPQUFPO0lBQUMsSUFBQSxJQUFJLENBK0ZsQjtJQS9GYyxXQUFBLElBQUksRUFBQyxDQUFDO1FBQ2pCO1lBQ0k7WUFFQSxDQUFDO1lBRU8scUNBQWtCLEdBQTFCO2dCQUNJLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN4RCxDQUFDO1lBRU8sd0NBQXFCLEdBQTdCO2dCQUNJLElBQUksa0JBQWtCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdkQsa0JBQWtCLENBQUMsRUFBRSxHQUFHLG9CQUFvQixDQUFDO2dCQUU3QyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUNoRCxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBRXJDLElBQUksaUJBQWlCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdEQsaUJBQWlCLENBQUMsRUFBRSxHQUFHLHNCQUFzQixDQUFDO2dCQUM5QyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztnQkFFdkMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUVwQyxJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFD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LE9BQU8sS0FBUCxPQUFPLFFBZ0diO0FDbkdELElBQU8sT0FBTyxDQVNiO0FBVEQsV0FBTyxPQUFPO0lBQUMsSUFBQSxJQUFJLENBU2xCO0lBVGMsV0FBQSxJQUFJLEVBQUMsQ0FBQztRQUNqQjtZQUFBO1lBT0EsQ0FBQztZQUFELHFCQUFDO1FBQUQsQ0FQQSxBQU9DLElBQUE7UUFQWSxtQkFBYyxpQkFPMUIsQ0FBQTtJQUNMLENBQUMsRUFUYyxJQUFJLEdBQUosWUFBSSxLQUFKLFlBQUksUUFTbEI7QUFBRCxDQUFDLEVBVE0sT0FBTyxLQUFQLE9BQU8sUUFTYiIsImZpbGUiOiJjb3JlLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlIFNjcmlwdHMuQ29yZSB7XHJcbiAgICBleHBvcnQgY2xhc3MgTGlnaHRib3gge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZGV0ZWN0SGlzdG9yeVN0YXRlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKHdpbmRvdy5oaXN0b3J5ICYmIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUxpZ2h0Ym94RWxlbWVudCgpIHtcclxuICAgICAgICAgICAgbGV0IGRpdkxpZ2h0Ym94T3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIGRpdkxpZ2h0Ym94T3ZlcmxheS5pZCA9IFwiZHZMaWdodGJveF9vdmVybGF5XCI7XHJcblxyXG4gICAgICAgICAgICAkKGRpdkxpZ2h0Ym94T3ZlcmxheSkuY2xpY2sodGhpcy5jbG9zZUxpZ2h0Ym94KTtcclxuICAgICAgICAgICAgJChcImJvZHlcIikuYXBwZW5kKGRpdkxpZ2h0Ym94T3ZlcmxheSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgbGlnaHRib3hDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBsaWdodGJveENvbnRhaW5lci5pZCA9IFwiZHZMaWdodGJveF9jb250YWluZXJcIjtcclxuICAgICAgICAgICAgbGlnaHRib3hDb250YWluZXIuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcclxuXHJcbiAgICAgICAgICAgICQoXCJib2R5XCIpLmFwcGVuZChsaWdodGJveENvbnRhaW5lcik7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGl2TGlnaHRib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBkaXZMaWdodGJveC5pZCA9IFwiZHZMaWdodGJveF9jb250ZW50XCI7XHJcbiAgICAgICAgICAgICQoXCIjZHZMaWdodGJveF9jb250YWluZXJcIikuYXBwZW5kKGRpdkxpZ2h0Ym94KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvcGVuTGlnaHRib3godmFsdWUpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR2TGlnaHRib3hfb3ZlcmxheVwiKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVMaWdodGJveEVsZW1lbnQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGxpZ2h0Ym94Q29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHZMaWdodGJveF9jb250ZW50XCIpO1xyXG4gICAgICAgICAgICAkKGxpZ2h0Ym94Q29udGVudCkuYXR0cihcImRhdGEtdG9wXCIsICQod2luZG93KS5zY3JvbGxUb3AoKSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgY2xvc2VGdW5jUG50ciA9IHRoaXMuY2xvc2VMaWdodGJveDtcclxuICAgICAgICAgICAgJChcImh0bWxcIikuYWRkQ2xhc3MoJ2xpZ2h0Ym94Jyk7XHJcblxyXG4gICAgICAgICAgICAvL01vYmlsZSBsaWdodGJveFxyXG4gICAgICAgICAgICBpZiAoJChsaWdodGJveENvbnRlbnQpLndpZHRoKCkgPj0gJCh3aW5kb3cpLndpZHRoKCkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kZXRlY3RIaXN0b3J5U3RhdGUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKG51bGwsIG51bGwsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICQod2luZG93KS5iaW5kKCdwb3BzdGF0ZScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VGdW5jUG50cigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IG1hcmdpblRvcCA9ICgkKHdpbmRvdykuaGVpZ2h0KCkgLSAkKGxpZ2h0Ym94Q29udGVudCkuaGVpZ2h0KCkpIC8gNDtcclxuICAgICAgICAgICAgJChsaWdodGJveENvbnRlbnQpLmNzcyhcInRvcFwiLCAobWFyZ2luVG9wICsgJCh3aW5kb3cpLnNjcm9sbFRvcCgpKSArIFwicHhcIik7XHJcblxyXG4gICAgICAgICAgICAkKFwiI2R2TGlnaHRib3hfb3ZlcmxheVwiKS5zaG93KCk7XHJcbiAgICAgICAgICAgIGxldCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIGNsb3NlQnV0dG9uLmlkID0gXCJsaWdodGJveENsb3NlQnV0dG9uXCI7XHJcbiAgICAgICAgICAgIGNsb3NlQnV0dG9uLmlubmVyVGV4dCA9IFwieFwiO1xyXG4gICAgICAgICAgICBjbG9zZUJ1dHRvbi50aXRsZSA9IFwiY2xvc2VcIjtcclxuXHJcbiAgICAgICAgICAgIGxpZ2h0Ym94Q29udGVudC5hcHBlbmRDaGlsZChjbG9zZUJ1dHRvbik7XHJcbiAgICAgICAgICAgIGxpZ2h0Ym94Q29udGVudC5hcHBlbmRDaGlsZCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICQobGlnaHRib3hDb250ZW50KS5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICAkKFwiI2xpZ2h0Ym94Q2xvc2VCdXR0b25cIikuY2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2xvc2VGdW5jUG50cigpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgJChkb2N1bWVudCkub24oJ2tleXVwJywgKGV2dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2dC5rZXlDb2RlID09IDI3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VGdW5jUG50cigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY2xvc2VMaWdodGJveCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IGxpZ2h0Ym94Q29udGVudCA9ICQoXCIjZHZMaWdodGJveF9jb250ZW50XCIpO1xyXG4gICAgICAgICAgICAkKFwiaHRtbFwiKS5yZW1vdmVDbGFzcygnbGlnaHRib3gnKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKGxpZ2h0Ym94Q29udGVudCkud2lkdGgoKSA+PSAkKHdpbmRvdykud2lkdGgoKSkge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHBhcnNlSW50KCQobGlnaHRib3hDb250ZW50KS5hdHRyKFwiZGF0YS10b3BcIikpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJChcIiNkdkxpZ2h0Ym94X292ZXJsYXlcIikuZmFkZU91dCgnZmFzdCcpO1xyXG4gICAgICAgICAgICAkKGxpZ2h0Ym94Q29udGVudCkuZmFkZU91dCgnZmFzdCcsICgpID0+e1xyXG4gICAgICAgICAgICAgICAgJChsaWdodGJveENvbnRlbnQpLmh0bWwoXCJcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJChkb2N1bWVudCkub2ZmKCdrZXl1cCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm1vZHVsZSBTY3JpcHRzLkNvcmUge1xyXG4gICAgZXhwb3J0IGNsYXNzIFRpbmRlckFwaSB7XHJcbiAgICAgICAgcHJpdmF0ZSBfY2xpZW50OiBBcGlDbGllbnQ7XHJcbiAgICAgICAgcHJpdmF0ZSBfcm9vdFVybDogc3RyaW5nID0gXCIvQXBpL1wiO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihjbGllbnQ6IEFwaUNsaWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jbGllbnQgPSBjbGllbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0TWF0Y2hlcyhzdWNjZXNzRnVuYzogKGRhdGEpID0+IHZvaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2xpZW50LmdldCh0aGlzLl9yb290VXJsICsgXCJtYXRjaGVzXCIsIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzRnVuYyhkYXRhKTtcclxuICAgICAgICAgICAgfSwgKCkgPT4geyB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXRMb2NhdGlvbihsYXQsIGxvbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2xpZW50LnBvc3QodGhpcy5fcm9vdFVybCArIFwicGluZ1wiLCBbW1wibGF0XCIsIGxhdF0sIFtcImxvblwiLCBsb25nXV0sIChkYXRhKSA9PiB7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBsaWtlTWF0Y2godXNlcklkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NsaWVudC5wb3N0KHRoaXMuX3Jvb3RVcmwgKyBcImxpa2UvXCIgKyB1c2VySWQsIG51bGwsIChkYXRhKSA9PiB7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBwYXNzTWF0Y2godXNlcklkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NsaWVudC5wb3N0KHRoaXMuX3Jvb3RVcmwgKyBcInBhc3MvXCIgKyB1c2VySWQsIG51bGwsIChkYXRhKSA9PiB7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsIm1vZHVsZSBTY3JpcHRzLkNvcmUge1xyXG4gICAgZXhwb3J0IGNsYXNzIFRpbmRlckF1dGhlbnRpY2F0b3Ige1xyXG5cclxuICAgICAgICBwcml2YXRlIF9jbGllbnQ6IEFwaUNsaWVudDtcclxuICAgICAgICBwcml2YXRlIF9yb290VXJsOiBzdHJpbmcgPSBcIi9BcGkvXCI7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGNsaWVudDogQXBpQ2xpZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NsaWVudCA9IGNsaWVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhdXRoZW50aWNhdGUoZmFjZWJvb2tJZDogc3RyaW5nLCBmYWNlYm9va0FjY2Vzc1Rva2VuOiBzdHJpbmcsIHN1Y2Nlc3NGdW5jOiAodG9rZW46IHN0cmluZykgPT4gdm9pZCkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fY2xpZW50LnBvc3QodGhpcy5fcm9vdFVybCArIFwiQXV0aGVudGljYXRlXCIsIFtbXCJmYWNlYm9va0lkXCIsIGZhY2Vib29rSWRdLCBbXCJhdXRoZW50aWNhdGlvblRva2VuXCIsIGZhY2Vib29rQWNjZXNzVG9rZW5dXSwgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRpbmRlclRva2VuXCIsIGRhdGEudG9rZW4pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRBY2Nlc3NUb2tlbigpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidGluZGVyVG9rZW5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiLy9pbXBvcnQgSlF1ZXJ5QXBpQ2xpZW50IGZyb20gXCIuLi9DbGllbnQvSnF1ZXJ5Q2xpZW50LnRzXCI7XHJcbi8vaW1wb3J0IHtBcGlDbGllbnR9IGZyb20gXCIuLi9DbGllbnQvQVBpQ2xpZW50LnRzXCI7XHJcblxyXG5tb2R1bGUgU2NyaXB0cy5Db3JlIHtcclxuICAgIGV4cG9ydCBjbGFzcyBDbGllbnRGYWN0b3J5IHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIGdldENsaWVudCgpOiBBcGlDbGllbnQge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEpRdWVyeUFwaUNsaWVudCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi8vaW1wb3J0IHtBcGlDbGllbnR9IGZyb20gXCIuL0FQaUNsaWVudFwiO1xyXG4vL2ltcG9ydCBSZXF1ZXN0T3B0aW9ucyBmcm9tIFwiLi9SZXF1ZXN0T3B0aW9uc1wiO1xyXG5cclxubW9kdWxlIFNjcmlwdHMuQ29yZSB7XHJcbiAgICBleHBvcnQgY2xhc3MgSlF1ZXJ5QXBpQ2xpZW50IGltcGxlbWVudHMgQXBpQ2xpZW50IHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNvbnZlcnRUb1Bvc3RQYXJhbSh1cmxQYXJhbXM6IGFueSkge1xyXG4gICAgICAgICAgICB2YXIgdXJsUGFyYW1zU3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgaWYgKCF1cmxQYXJhbXMpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHVybFBhcmFtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVybFBhcmFtc1N0cmluZyAhPT0gXCJcIikgeyB1cmxQYXJhbXNTdHJpbmcgKz0gXCImXCI7IH1cclxuICAgICAgICAgICAgICAgIHVybFBhcmFtc1N0cmluZyArPSB1cmxQYXJhbXNbaV1bMF0gKyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudCh1cmxQYXJhbXNbaV1bMV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB1cmxQYXJhbXNTdHJpbmc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNvbnZlcnRUb0Zvcm1EYXRhKHVybFBhcmFtczogYW55KSB7XHJcbiAgICAgICAgICAgIGlmICghdXJsUGFyYW1zKSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgdmFyIGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdXJsUGFyYW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQodXJsUGFyYW1zW2ldWzBdLCB1cmxQYXJhbXNbaV1bMV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtRGF0YTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQodXJsOiBzdHJpbmcsIG9uU3VjY2VzczogYW55LCBvbkZhaWx1cmU6IGFueSkge1xyXG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucygpO1xyXG4gICAgICAgICAgICBvcHRpb25zLnVybCA9IHVybDtcclxuICAgICAgICAgICAgb3B0aW9ucy5vblN1Y2Nlc3MgPSBvblN1Y2Nlc3M7XHJcbiAgICAgICAgICAgIG9wdGlvbnMub25GYWlsdXJlID0gb25GYWlsdXJlO1xyXG4gICAgICAgICAgICBvcHRpb25zLnJlcXVlc3RUeXBlID0gXCJHRVRcIjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZG9SZXF1ZXN0KG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBwb3N0KHVybDogc3RyaW5nLCB1cmxQYXJhbXM6IGFueSwgb25TdWNjZXNzOiBhbnksIG9uRmFpbHVyZT86IGFueSwgb25Qcm9ncmVzcz86IGFueSkge1xyXG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucygpO1xyXG4gICAgICAgICAgICBvcHRpb25zLnVybCA9IHVybDtcclxuICAgICAgICAgICAgb3B0aW9ucy5kYXRhID0gdGhpcy5jb252ZXJ0VG9Gb3JtRGF0YSh1cmxQYXJhbXMpO1xyXG4gICAgICAgICAgICBvcHRpb25zLm9uU3VjY2VzcyA9IG9uU3VjY2VzcztcclxuICAgICAgICAgICAgb3B0aW9ucy5vbkZhaWx1cmUgPSBvbkZhaWx1cmU7XHJcbiAgICAgICAgICAgIG9wdGlvbnMucmVxdWVzdFR5cGUgPSBcIlBPU1RcIjtcclxuICAgICAgICAgICAgb3B0aW9ucy5vblByb2dyZXNzID0gb25Qcm9ncmVzcztcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZG9SZXF1ZXN0KG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBkZWxldGUodXJsOiBzdHJpbmcsIHVybFBhcmFtczogYW55LCBvblN1Y2Nlc3M6IGFueSwgb25GYWlsdXJlPzogYW55KSB7XHJcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKCk7XHJcbiAgICAgICAgICAgIG9wdGlvbnMudXJsID0gdXJsO1xyXG4gICAgICAgICAgICBvcHRpb25zLmRhdGEgPSB0aGlzLmNvbnZlcnRUb0Zvcm1EYXRhKHVybFBhcmFtcyk7XHJcbiAgICAgICAgICAgIG9wdGlvbnMub25TdWNjZXNzID0gb25TdWNjZXNzO1xyXG4gICAgICAgICAgICBvcHRpb25zLm9uRmFpbHVyZSA9IG9uRmFpbHVyZTtcclxuICAgICAgICAgICAgb3B0aW9ucy5yZXF1ZXN0VHlwZSA9IFwiREVMRVRFXCI7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRvUmVxdWVzdChvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZG9SZXF1ZXN0KG9wdGlvbnM6IFJlcXVlc3RPcHRpb25zKSB7XHJcbiAgICAgICAgICAgICQuYWpheChvcHRpb25zLnVybCwge1xyXG4gICAgICAgICAgICAgICAgeGhyOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHhocm9iaiA9ICQuYWpheFNldHRpbmdzLnhocigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh4aHJvYmoudXBsb2FkICYmIG9wdGlvbnMub25Qcm9ncmVzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4aHJvYmoudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGVyY2VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9zaXRpb24gPSBldmVudC5sb2FkZWQgfHwgZXZlbnQucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG90YWwgPSBldmVudC50b3RhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldmVudC5sZW5ndGhDb21wdXRhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyY2VudCA9IE1hdGguY2VpbChwb3NpdGlvbiAvIHRvdGFsICogMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLm9uUHJvZ3Jlc3MocGVyY2VudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB4aHJvYmo7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICdYLUF1dGgtVG9rZW4nOiB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0aW5kZXJUb2tlblwiKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgICAgICAgICAgICAgIGRhdGE6IG9wdGlvbnMuZGF0YSxcclxuICAgICAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IG9wdGlvbnMucmVxdWVzdFR5cGUsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLm9uU3VjY2VzcykgeyBvcHRpb25zLm9uU3VjY2VzcyhkYXRhKTsgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLm9uRmFpbHVyZSkgeyBvcHRpb25zLm9uRmFpbHVyZShkYXRhKTsgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJtb2R1bGUgU2NyaXB0cy5Db3JlIHtcclxuICAgIGV4cG9ydCBjbGFzcyBSZXF1ZXN0T3B0aW9ucyB7XHJcbiAgICAgICAgZGF0YTogYW55O1xyXG4gICAgICAgIHVybDogc3RyaW5nO1xyXG4gICAgICAgIG9uUHJvZ3Jlc3M6IGFueTtcclxuICAgICAgICBvblN1Y2Nlc3M6IGFueTtcclxuICAgICAgICBvbkZhaWx1cmU6IGFueTtcclxuICAgICAgICByZXF1ZXN0VHlwZTogYW55O1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
