var Scripts;
(function (Scripts) {
    var Pages;
    (function (Pages) {
        var DefaultPage = (function () {
            function DefaultPage() {
                this.apiClient = new Scripts.Core.TinderApi(Scripts.Core.ClientFactory.getClient());
                this.tinderAuthenticator = new Scripts.Core.TinderAuthenticator(Scripts.Core.ClientFactory.getClient());
            }
            DefaultPage.prototype.createLoginWindow = function () {
                var _this = this;
                var container = document.createElement("div");
                var facebookIdBox = document.createElement("input");
                facebookIdBox.placeholder = "facebook Id";
                var accessTokenBox = document.createElement("input");
                accessTokenBox.placeholder = "access token";
                var loginButton = document.createElement("input");
                loginButton.value = "Login";
                loginButton.type = "button";
                $(loginButton).click(function () {
                    _this.tinderAuthenticator.authenticate(facebookIdBox.value, accessTokenBox.value, function (data) {
                    });
                });
                container.appendChild(facebookIdBox);
                container.appendChild(accessTokenBox);
                container.appendChild(loginButton);
                return container;
            };
            DefaultPage.prototype.createHeaderWindow = function () {
                var _this = this;
                var container = document.createElement("div");
                var authenticateButton = document.createElement("input");
                authenticateButton.type = "button";
                authenticateButton.value = "Login";
                $(authenticateButton).click(function () {
                    var container = document.getElementById("container");
                    container.innerHTML = "";
                    container.appendChild(_this.createLoginWindow());
                });
                container.appendChild(authenticateButton);
                if (this.tinderAuthenticator.getAccessToken()) {
                    var matchButton = document.createElement("input");
                    matchButton.type = "button";
                    matchButton.value = "Match";
                    $(matchButton).click(function () {
                        var container = document.getElementById("container");
                        container.innerHTML = "";
                        container.appendChild(_this.createMatchWindow());
                    });
                    var positionButton = document.createElement("input");
                    positionButton.type = "button";
                    positionButton.value = "Set position";
                    $(positionButton).click(function () {
                        var container = document.getElementById("container");
                        container.innerHTML = "";
                        container.appendChild(_this.createPositonWindow());
                    });
                    container.appendChild(matchButton);
                    container.appendChild(positionButton);
                }
                return container;
            };
            DefaultPage.prototype.parseMatches = function (data) {
            };
            DefaultPage.prototype.parseMatch = function (match) {
                var _this = this;
                var containerDiv = document.createElement("div");
                containerDiv.className = "match";
                var nameDiv = document.createElement("div");
                var bioDiv = document.createElement("div");
                var ageDiv = document.createElement("div");
                var distanceDiv = document.createElement("div");
                if (match.photos) {
                    var photoContainer = document.createElement("div");
                    var photoDiv_1 = document.createElement("img");
                    photoDiv_1.src = match.photos[0].url;
                    photoDiv_1.width = 300;
                    photoDiv_1.height = 370;
                    photoContainer.className = "pictureContainer";
                    var thumbnailContainer = document.createElement("div");
                    var _loop_1 = function() {
                        var thumbnail = document.createElement("img");
                        thumbnail.className = "thumbnail";
                        thumbnail.src = match.photos[e].url;
                        thumbnail.width = 50;
                        thumbnail.height = 50;
                        var pictureUrl = match.photos[e].url;
                        $(thumbnail).click(function () {
                            photoDiv_1.src = pictureUrl;
                        });
                        thumbnailContainer.className = "thumbnailcontainer";
                        thumbnailContainer.appendChild(thumbnail);
                    };
                    for (var e = 0; e < match.photos.length; e++) {
                        _loop_1();
                    }
                    photoContainer.appendChild(photoDiv_1);
                    photoContainer.appendChild(thumbnailContainer);
                    containerDiv.appendChild(photoContainer);
                }
                nameDiv.innerText = match.name;
                nameDiv.className = "name";
                ageDiv.innerText = match.birth_date;
                ageDiv.className = "age";
                bioDiv.innerText = match.bio;
                bioDiv.className = "bio";
                distanceDiv.innerText = "" + (match.distance_mi * 0.000621371192);
                var likeButton = document.createElement("div");
                likeButton.innerText = "Like";
                likeButton.className = "button active";
                $(likeButton).click(function () {
                    _this.apiClient.likeMatch(match._id);
                    likeButton.className = "button inactive";
                });
                var passButton = document.createElement("div");
                passButton.innerText = "Pass";
                passButton.className = "button active";
                $(passButton).click(function () {
                    _this.apiClient.passMatch(match._id);
                    passButton.className = "button inactive";
                });
                containerDiv.appendChild(nameDiv);
                containerDiv.appendChild(ageDiv);
                containerDiv.appendChild(bioDiv);
                containerDiv.appendChild(likeButton);
                containerDiv.appendChild(passButton);
                return containerDiv;
            };
            DefaultPage.prototype.createMatchWindow = function () {
                var _this = this;
                var container = document.createElement("div");
                this.apiClient.getMatches(function (data) {
                    for (var i = 0; i < data.results.length; i++) {
                        var match = data.results[i];
                        container.appendChild(_this.parseMatch(match));
                    }
                });
                return container;
            };
            DefaultPage.prototype.createPositonWindow = function () {
                var _this = this;
                var positionPage = new Scripts.Pages.PositionPage();
                var container = document.createElement("div");
                var positionButton = document.createElement("input");
                positionButton.value = "Position";
                positionButton.type = "button";
                $(positionButton).click(function () {
                    _this.apiClient.setLocation(positionPage.getLatitude(), positionPage.getLongitude());
                });
                container.appendChild(positionButton);
                container.appendChild(positionPage.createPositionPage());
                return container;
            };
            return DefaultPage;
        }());
        Pages.DefaultPage = DefaultPage;
    })(Pages = Scripts.Pages || (Scripts.Pages = {}));
})(Scripts || (Scripts = {}));
$(document).ready(function () {
    var defaultPage = new Scripts.Pages.DefaultPage();
    var header = document.getElementById("header");
    header.appendChild(defaultPage.createHeaderWindow());
    var container = document.getElementById("container");
    container.appendChild(defaultPage.createLoginWindow());
});

//# sourceMappingURL=data:application/json;base64,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aUJBQVcsY0E2S3ZCLENBQUE7SUFDTCxDQUFDLEVBL0tjLEtBQUssR0FBTCxhQUFLLEtBQUwsYUFBSyxRQStLbkI7QUFBRCxDQUFDLEVBL0tNLE9BQU8sS0FBUCxPQUFPLFFBK0tiO0FBRUQsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNkLElBQUksV0FBVyxHQUFHLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsRCxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9DLE1BQU0sQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQztJQUVyRCxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3JELFNBQVMsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztBQUUzRCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJBdXRoZW50aWNhdGlvblBhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUgU2NyaXB0cy5QYWdlcyB7XHJcbiAgICBleHBvcnQgY2xhc3MgRGVmYXVsdFBhZ2Uge1xyXG4gICAgICAgIHByaXZhdGUgdGluZGVyQXV0aGVudGljYXRvcjogU2NyaXB0cy5Db3JlLlRpbmRlckF1dGhlbnRpY2F0b3I7XHJcbiAgICAgICAgcHJpdmF0ZSBhcGlDbGllbnQ6IFNjcmlwdHMuQ29yZS5UaW5kZXJBcGk7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLmFwaUNsaWVudCA9IG5ldyBTY3JpcHRzLkNvcmUuVGluZGVyQXBpKFNjcmlwdHMuQ29yZS5DbGllbnRGYWN0b3J5LmdldENsaWVudCgpKTsgXHJcbiAgICAgICAgICAgIHRoaXMudGluZGVyQXV0aGVudGljYXRvciA9IG5ldyBTY3JpcHRzLkNvcmUuVGluZGVyQXV0aGVudGljYXRvcihTY3JpcHRzLkNvcmUuQ2xpZW50RmFjdG9yeS5nZXRDbGllbnQoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY3JlYXRlTG9naW5XaW5kb3coKSB7XHJcbiAgICAgICAgICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBsZXQgZmFjZWJvb2tJZEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgZmFjZWJvb2tJZEJveC5wbGFjZWhvbGRlciA9IFwiZmFjZWJvb2sgSWRcIjtcclxuICAgICAgICAgICAgbGV0IGFjY2Vzc1Rva2VuQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgICAgICAgICBhY2Nlc3NUb2tlbkJveC5wbGFjZWhvbGRlciA9IFwiYWNjZXNzIHRva2VuXCI7XHJcblxyXG4gICAgICAgICAgICBsZXQgbG9naW5CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgIGxvZ2luQnV0dG9uLnZhbHVlID0gXCJMb2dpblwiO1xyXG4gICAgICAgICAgICBsb2dpbkJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcclxuICAgICAgICAgICAgJChsb2dpbkJ1dHRvbikuY2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aW5kZXJBdXRoZW50aWNhdG9yLmF1dGhlbnRpY2F0ZShmYWNlYm9va0lkQm94LnZhbHVlLCBhY2Nlc3NUb2tlbkJveC52YWx1ZSwgKGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGZhY2Vib29rSWRCb3gpO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYWNjZXNzVG9rZW5Cb3gpO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobG9naW5CdXR0b24pO1xyXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZUhlYWRlcldpbmRvdygpIHtcclxuICAgICAgICAgICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIGxldCBhdXRoZW50aWNhdGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgIGF1dGhlbnRpY2F0ZUJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcclxuICAgICAgICAgICAgYXV0aGVudGljYXRlQnV0dG9uLnZhbHVlID0gXCJMb2dpblwiO1xyXG4gICAgICAgICAgICAkKGF1dGhlbnRpY2F0ZUJ1dHRvbikuY2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5jcmVhdGVMb2dpbldpbmRvdygpKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYXV0aGVudGljYXRlQnV0dG9uKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGluZGVyQXV0aGVudGljYXRvci5nZXRBY2Nlc3NUb2tlbigpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWF0Y2hCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgICAgICBtYXRjaEJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcclxuICAgICAgICAgICAgICAgIG1hdGNoQnV0dG9uLnZhbHVlID0gXCJNYXRjaFwiO1xyXG4gICAgICAgICAgICAgICAgJChtYXRjaEJ1dHRvbikuY2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lclwiKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5jcmVhdGVNYXRjaFdpbmRvdygpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBwb3NpdGlvbkJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uQnV0dG9uLnR5cGUgPSBcImJ1dHRvblwiO1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb25CdXR0b24udmFsdWUgPSBcIlNldCBwb3NpdGlvblwiO1xyXG4gICAgICAgICAgICAgICAgJChwb3NpdGlvbkJ1dHRvbikuY2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lclwiKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5jcmVhdGVQb3NpdG9uV2luZG93KCkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG1hdGNoQnV0dG9uKTtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwb3NpdGlvbkJ1dHRvbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcGFyc2VNYXRjaGVzKGRhdGE6IGFueSkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBwYXJzZU1hdGNoKG1hdGNoOiBhbnkpIHtcclxuICAgICAgICAgICAgbGV0IGNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lckRpdi5jbGFzc05hbWUgPSBcIm1hdGNoXCI7XHJcbiAgICAgICAgICAgIGxldCBuYW1lRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgbGV0IGJpb0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIGxldCBhZ2VEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBsZXQgZGlzdGFuY2VEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1hdGNoLnBob3Rvcykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBob3RvQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgICAgIGxldCBwaG90b0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbiAgICAgICAgICAgICAgICBwaG90b0Rpdi5zcmMgPSBtYXRjaC5waG90b3NbMF0udXJsO1xyXG4gICAgICAgICAgICAgICAgcGhvdG9EaXYud2lkdGggPSAzMDA7XHJcbiAgICAgICAgICAgICAgICBwaG90b0Rpdi5oZWlnaHQgPSAzNzA7XHJcblxyXG4gICAgICAgICAgICAgICAgcGhvdG9Db250YWluZXIuY2xhc3NOYW1lID0gXCJwaWN0dXJlQ29udGFpbmVyXCI7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGh1bWJuYWlsQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBlID0gMDsgZSA8IG1hdGNoLnBob3Rvcy5sZW5ndGg7IGUrKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGh1bWJuYWlsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsLmNsYXNzTmFtZSA9IFwidGh1bWJuYWlsXCI7XG4gICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbC5zcmMgPSBtYXRjaC5waG90b3NbZV0udXJsO1xuICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWwud2lkdGggPSA1MDtcbiAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsLmhlaWdodCA9IDUwO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBwaWN0dXJlVXJsID0gbWF0Y2gucGhvdG9zW2VdLnVybDtcbiAgICAgICAgICAgICAgICAgICAgJCh0aHVtYm5haWwpLmNsaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBob3RvRGl2LnNyYyA9IHBpY3R1cmVVcmw7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxDb250YWluZXIuY2xhc3NOYW1lID0gXCJ0aHVtYm5haWxjb250YWluZXJcIjtcbiAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsQ29udGFpbmVyLmFwcGVuZENoaWxkKHRodW1ibmFpbCk7XG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHBob3RvQ29udGFpbmVyLmFwcGVuZENoaWxkKHBob3RvRGl2KTtcclxuICAgICAgICAgICAgICAgIHBob3RvQ29udGFpbmVyLmFwcGVuZENoaWxkKHRodW1ibmFpbENvbnRhaW5lcik7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQocGhvdG9Db250YWluZXIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBuYW1lRGl2LmlubmVyVGV4dCA9IG1hdGNoLm5hbWU7XHJcbiAgICAgICAgICAgIG5hbWVEaXYuY2xhc3NOYW1lID0gXCJuYW1lXCI7XHJcbiAgICAgICAgICAgIGFnZURpdi5pbm5lclRleHQgPSBtYXRjaC5iaXJ0aF9kYXRlO1xyXG4gICAgICAgICAgICBhZ2VEaXYuY2xhc3NOYW1lID0gXCJhZ2VcIjtcclxuICAgICAgICAgICAgYmlvRGl2LmlubmVyVGV4dCA9IG1hdGNoLmJpbztcclxuICAgICAgICAgICAgYmlvRGl2LmNsYXNzTmFtZSA9IFwiYmlvXCI7XHJcbiAgICAgICAgICAgIGRpc3RhbmNlRGl2LmlubmVyVGV4dCA9IFwiXCIgKyAobWF0Y2guZGlzdGFuY2VfbWkgKiAwLjAwMDYyMTM3MTE5Mik7XHJcblxyXG4gICAgICAgICAgICBsZXQgbGlrZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIGxpa2VCdXR0b24uaW5uZXJUZXh0ID0gXCJMaWtlXCI7XHJcbiAgICAgICAgICAgIGxpa2VCdXR0b24uY2xhc3NOYW1lID0gXCJidXR0b24gYWN0aXZlXCI7XHJcbiAgICAgICAgICAgICQobGlrZUJ1dHRvbikuY2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcGlDbGllbnQubGlrZU1hdGNoKG1hdGNoLl9pZCk7XHJcbiAgICAgICAgICAgICAgICBsaWtlQnV0dG9uLmNsYXNzTmFtZSA9IFwiYnV0dG9uIGluYWN0aXZlXCI7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbGV0IHBhc3NCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBwYXNzQnV0dG9uLmlubmVyVGV4dCA9IFwiUGFzc1wiO1xyXG4gICAgICAgICAgICBwYXNzQnV0dG9uLmNsYXNzTmFtZSA9IFwiYnV0dG9uIGFjdGl2ZVwiO1xyXG4gICAgICAgICAgICAkKHBhc3NCdXR0b24pLmNsaWNrKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXBpQ2xpZW50LnBhc3NNYXRjaChtYXRjaC5faWQpO1xyXG4gICAgICAgICAgICAgICAgcGFzc0J1dHRvbi5jbGFzc05hbWUgPSBcImJ1dHRvbiBpbmFjdGl2ZVwiO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChuYW1lRGl2KTtcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGFnZURpdik7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChiaW9EaXYpO1xyXG4gICAgICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQobGlrZUJ1dHRvbik7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChwYXNzQnV0dG9uKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lckRpdjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVNYXRjaFdpbmRvdygpIHtcclxuICAgICAgICAgICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIHRoaXMuYXBpQ2xpZW50LmdldE1hdGNoZXMoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5yZXN1bHRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXRjaCA9IGRhdGEucmVzdWx0c1tpXTtcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnBhcnNlTWF0Y2gobWF0Y2gpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZVBvc2l0b25XaW5kb3coKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHBvc2l0aW9uUGFnZSA9IG5ldyBTY3JpcHRzLlBhZ2VzLlBvc2l0aW9uUGFnZSgpO1xyXG4gICAgICAgICAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgbGV0IHBvc2l0aW9uQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgICAgICAgICBwb3NpdGlvbkJ1dHRvbi52YWx1ZSA9IFwiUG9zaXRpb25cIjtcclxuICAgICAgICAgICAgcG9zaXRpb25CdXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XHJcblxyXG4gICAgICAgICAgICAkKHBvc2l0aW9uQnV0dG9uKS5jbGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFwaUNsaWVudC5zZXRMb2NhdGlvbihwb3NpdGlvblBhZ2UuZ2V0TGF0aXR1ZGUoKSwgcG9zaXRpb25QYWdlLmdldExvbmdpdHVkZSgpKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocG9zaXRpb25CdXR0b24pO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocG9zaXRpb25QYWdlLmNyZWF0ZVBvc2l0aW9uUGFnZSgpKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XHJcbiAgICB2YXIgZGVmYXVsdFBhZ2UgPSBuZXcgU2NyaXB0cy5QYWdlcy5EZWZhdWx0UGFnZSgpO1xyXG4gICAgbGV0IGhlYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGVhZGVyXCIpO1xyXG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKGRlZmF1bHRQYWdlLmNyZWF0ZUhlYWRlcldpbmRvdygpKTtcclxuXHJcbiAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250YWluZXJcIik7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGVmYXVsdFBhZ2UuY3JlYXRlTG9naW5XaW5kb3coKSk7XHJcblxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
