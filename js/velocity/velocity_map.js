
const velibMap = {
	center: "",
	canvas: "",
	options: {},
	map(){
		map = new google.maps.Map(this.canvas, this.options);
	},
	makeMarker(station){
		const marker = new google.maps.Marker({
			position: new google.maps.LatLng(station.position.lat, station.position.lng),
			map: map,
			title: station.name
		});
		marker.addListener('click', function() {
			    //map.setZoom(20);
			    map.setCenter(marker.getPosition());
			    velocityController.stations.getStation(station);
			    velocityController.reservations.closeReservationCard();
			});
		marker.setMap(map);
	},
	locate(){
		if(velibMapSettings.locate.geolocation){ // If settings OK to use user location
			if (navigator.geolocation) {
				var infoWindow = new google.maps.InfoWindow({map: map});
				navigator.geolocation.getCurrentPosition(function(position) {
			   		var pos = {
				        lat: position.coords.latitude,
				        lng: position.coords.longitude
			      	};
			      	infoWindow.setPosition(pos);
			      	infoWindow.setContent('Vous êtes ici.');
			      	map.setCenter(pos);
      			});
			} else {
				alert("Votre navigateur ne permet la géolocalisation");
			}
		} else{ // Use fake location (for test purposes in case user is not in Paris)
			var infoWindow = new google.maps.InfoWindow({map: map});
			var pos = {
				        lat: velibMapSettings.locate.fakeUserLocations[0].lat,
				        lng: velibMapSettings.locate.fakeUserLocations[0].lng
			      	};
			infoWindow.setPosition(pos);
			infoWindow.setContent('Vous êtes ici.');
			map.setCenter(pos);
		}
	},
	init(lat, lng, canvas, zoom){
		this.center = new google.maps.LatLng(velibMapSettings.lat, velibMapSettings.lng);
		this.canvas = document.getElementById(velibMapSettings.containerId);
		this.options = {center: this.center, zoom: velibMapSettings.zoom};
		this.map();
	}
}