module Scripts.Pages {
    export class DefaultPage {
        private tinderAuthenticator: Scripts.Core.TinderAuthenticator;
        private apiClient: Scripts.Core.TinderApi;

        constructor() {
            this.apiClient = new Scripts.Core.TinderApi(Scripts.Core.ClientFactory.getClient()); 
            this.tinderAuthenticator = new Scripts.Core.TinderAuthenticator(Scripts.Core.ClientFactory.getClient());
        }

        public createLoginWindow() {
            let container = document.createElement("div");
            let facebookIdBox = document.createElement("input");
            facebookIdBox.placeholder = "facebook Id";
            let accessTokenBox = document.createElement("input");
            accessTokenBox.placeholder = "access token";

            let loginButton = document.createElement("input");
            loginButton.value = "Login";
            loginButton.type = "button";
            $(loginButton).click(() => {
                this.tinderAuthenticator.authenticate(facebookIdBox.value, accessTokenBox.value, (data: any) => {
                    
                });
            });

            container.appendChild(facebookIdBox);
            container.appendChild(accessTokenBox);
            container.appendChild(loginButton);
            return container;
        }

        public createHeaderWindow() {
            let container = document.createElement("div");
            let authenticateButton = document.createElement("input");
            authenticateButton.type = "button";
            authenticateButton.value = "Login";
            $(authenticateButton).click(() => {
                let container = document.getElementById("container");
                container.innerHTML = "";
                container.appendChild(this.createLoginWindow());
            });

            container.appendChild(authenticateButton);
            if (this.tinderAuthenticator.getAccessToken()) {
                let matchButton = document.createElement("input");
                matchButton.type = "button";
                matchButton.value = "Match";
                $(matchButton).click(() => {
                    let container = document.getElementById("container");
                    container.innerHTML = "";
                    container.appendChild(this.createMatchWindow());
                });

                let positionButton = document.createElement("input");
                positionButton.type = "button";
                positionButton.value = "Set position";
                $(positionButton).click(() => {
                    let container = document.getElementById("container");
                    container.innerHTML = "";
                    container.appendChild(this.createPositonWindow());
                });

                container.appendChild(matchButton);
                container.appendChild(positionButton);
            }

            return container;
        }

        public parseMatches(data: any) {

        }

        public parseMatch(match: any) {
            let containerDiv = document.createElement("div");
            containerDiv.className = "match";
            let nameDiv = document.createElement("div");
            let bioDiv = document.createElement("div");
            let ageDiv = document.createElement("div");
            let distanceDiv = document.createElement("div");

            if (match.photos) {
                let photoContainer = document.createElement("div");
                let photoDiv = document.createElement("img");
                photoDiv.src = match.photos[0].url;
                photoDiv.width = 300;
                photoDiv.height = 370;

                photoContainer.className = "pictureContainer";
                let thumbnailContainer = document.createElement("div");
                for (var e = 0; e < match.photos.length; e++) {
                    let thumbnail = document.createElement("img");
                    thumbnail.className = "thumbnail";
                    thumbnail.src = match.photos[e].url;
                    thumbnail.width = 50;
                    thumbnail.height = 50;

                    let pictureUrl = match.photos[e].url;
                    $(thumbnail).click(() => {
                        photoDiv.src = pictureUrl;
                    });
                    thumbnailContainer.className = "thumbnailcontainer";
                    thumbnailContainer.appendChild(thumbnail);
                }

                photoContainer.appendChild(photoDiv);
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

            let likeButton = document.createElement("div");
            likeButton.innerText = "Like";
            likeButton.className = "button active";
            $(likeButton).click(() => {
                this.apiClient.likeMatch(match._id);
                likeButton.className = "button inactive";
            });

            let passButton = document.createElement("div");
            passButton.innerText = "Pass";
            passButton.className = "button active";
            $(passButton).click(() => {
                this.apiClient.passMatch(match._id);
                passButton.className = "button inactive";
            });

            containerDiv.appendChild(nameDiv);
            containerDiv.appendChild(ageDiv);
            containerDiv.appendChild(bioDiv);
            containerDiv.appendChild(likeButton);
            containerDiv.appendChild(passButton);
            return containerDiv;
        }

        public createMatchWindow() {
            let container = document.createElement("div");
            this.apiClient.getMatches((data) => {
                for (var i = 0; i < data.results.length; i++)
                {
                    var match = data.results[i];
                   
                    container.appendChild(this.parseMatch(match));
                }
            });

            return container;
        }

        public createPositonWindow()
        {
            var positionPage = new Scripts.Pages.PositionPage();
            let container = document.createElement("div");
            let positionButton = document.createElement("input");
            positionButton.value = "Position";
            positionButton.type = "button";

            $(positionButton).click(() => {
                this.apiClient.setLocation(positionPage.getLatitude(), positionPage.getLongitude());
            });

            container.appendChild(positionButton);
            container.appendChild(positionPage.createPositionPage());

            return container;
        }
    }
}

$(document).ready(() => {
    var defaultPage = new Scripts.Pages.DefaultPage();
    let header = document.getElementById("header");
    header.appendChild(defaultPage.createHeaderWindow());

    let container = document.getElementById("container");
    container.appendChild(defaultPage.createLoginWindow());

});
