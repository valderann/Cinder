var Scripts;
(function (Scripts) {
    var Pages;
    (function (Pages) {
        var PositionPage = (function () {
            function PositionPage() {
            }
            PositionPage.prototype.getLatitude = function () {
                return this.latitude;
            };
            PositionPage.prototype.getLongitude = function () {
                return this.longitude;
            };
            PositionPage.prototype.createPositionPage = function () {
                var _this = this;
                var mapDiv = document.createElement("div");
                mapDiv.id = "map-canvas";
                mapDiv.style.width = "600px;";
                mapDiv.style.height = "600px;";
                var map = new google.maps.Map(mapDiv, {
                    center: new google.maps.LatLng(0, 0),
                    zoom: 1,
                    minZoom: 1,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });
                var marker;
                google.maps.event.addListener(map, 'click', function (event) {
                    _this.latitude = event.latLng.lat();
                    _this.longitude = event.latLng.lng();
                    if (marker == null) {
                        marker = new google.maps.Marker({
                            position: event.latLng,
                            map: map
                        });
                        map.panTo(event.latLng);
                    }
                    else {
                        marker.setPosition(event.latLng);
                    }
                });
                return mapDiv;
            };
            return PositionPage;
        }());
        Pages.PositionPage = PositionPage;
    })(Pages = Scripts.Pages || (Scripts.Pages = {}));
})(Scripts || (Scripts = {}));
