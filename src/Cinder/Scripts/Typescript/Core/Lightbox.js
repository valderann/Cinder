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
