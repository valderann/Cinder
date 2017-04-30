module Scripts.Pages {
    export class PositionPage {
        private longitude;
        private latitude;

        public getLatitude() {
            return this.latitude;
        }

        public getLongitude() {
            return this.longitude;
        }

        public createPositionPage()
        {
            var mapDiv = document.createElement("div");
            mapDiv.id = "map-canvas";
            mapDiv.style.width = "600px;"
            mapDiv.style.height ="600px;"
            var map = new google.maps.Map(mapDiv, {
                center: new google.maps.LatLng(0, 0),
                zoom: 1,
                minZoom: 1,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            var marker;
            google.maps.event.addListener(map, 'click',  (event) => {
                this.latitude = event.latLng.lat();
                this.longitude = event.latLng.lng();

                if (marker == null) {
                    marker = new google.maps.Marker({
                        position: event.latLng,
                        map: map
                    });
                    map.panTo(event.latLng);
                } else {
                    marker.setPosition(event.latLng);
                }
            });

            return mapDiv;
        }
    }
}