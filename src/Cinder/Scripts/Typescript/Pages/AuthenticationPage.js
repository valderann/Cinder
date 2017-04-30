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
