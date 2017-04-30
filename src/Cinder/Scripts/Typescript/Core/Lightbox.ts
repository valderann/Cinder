module Scripts.Core {
    export class Lightbox {
        constructor() {

        }

        private detectHistoryState() {
            return (window.history && window.history.pushState);
        }

        private createLightboxElement() {
            let divLightboxOverlay = document.createElement("div");
            divLightboxOverlay.id = "dvLightbox_overlay";

            $(divLightboxOverlay).click(this.closeLightbox);
            $("body").append(divLightboxOverlay);

            let lightboxContainer = document.createElement("div");
            lightboxContainer.id = "dvLightbox_container";
            lightboxContainer.style.width = "100%";

            $("body").append(lightboxContainer);

            let divLightbox = document.createElement("div");
            divLightbox.id = "dvLightbox_content";
            $("#dvLightbox_container").append(divLightbox);
        }

        public openLightbox(value): void {
            if (!document.getElementById("dvLightbox_overlay")) {
                this.createLightboxElement();
            }

            let lightboxContent = document.getElementById("dvLightbox_content");
            $(lightboxContent).attr("data-top", $(window).scrollTop());

            let closeFuncPntr = this.closeLightbox;
            $("html").addClass('lightbox');

            //Mobile lightbox
            if ($(lightboxContent).width() >= $(window).width()) {

                if (this.detectHistoryState()) {
                    history.pushState(null, null, "");
                    $(window).bind('popstate', () => {
                        event.preventDefault();
                        closeFuncPntr();
                    });
                }
            }
            else {

            }

            let marginTop = ($(window).height() - $(lightboxContent).height()) / 4;
            $(lightboxContent).css("top", (marginTop + $(window).scrollTop()) + "px");

            $("#dvLightbox_overlay").show();
            let closeButton = document.createElement("div");
            closeButton.id = "lightboxCloseButton";
            closeButton.innerText = "x";
            closeButton.title = "close";

            lightboxContent.appendChild(closeButton);
            lightboxContent.appendChild(value);
            $(lightboxContent).show();

            $("#lightboxCloseButton").click(() => {
                closeFuncPntr();
            });

            let self = this;
            $(document).on('keyup', (evt) => {
                if (evt.keyCode == 27) {
                    closeFuncPntr();
                }
            });
        }

        private closeLightbox(): void {
            let lightboxContent = $("#dvLightbox_content");
            $("html").removeClass('lightbox');

            if ($(lightboxContent).width() >= $(window).width()) {
                window.scrollTo(0, parseInt($(lightboxContent).attr("data-top")));
            }

            $("#dvLightbox_overlay").fadeOut('fast');
            $(lightboxContent).fadeOut('fast', () =>{
                $(lightboxContent).html("");
            });

            $(document).off('keyup');
        }
    }
}