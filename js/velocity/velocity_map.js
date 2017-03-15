
const velibMap = {
	center: "",
	canvas: "",
	options: {},
	markers: [],
	map(){
		map = new google.maps.Map(this.canvas, this.options);
		map.addListener('dragend', function() {
			setTimeout(function(){
				var newCenter = {
				lat: map.getCenter().lat(),
				lng: map.getCenter().lng()
			}
		    velocityController.stations.getStationsByLocation(newCenter);
			}, 500);
		  });
		map.addListener('click', function(event) {
				var clickLocation = {
					lat: event.latLng.lat(),
					lng: event.latLng.lng()
				}
				console.log(clickLocation);
				velocityController.stations.getStationsByLocation(clickLocation);
		  });
	},
	makeMarker(station){
		const marker = new google.maps.Marker({
			position: new google.maps.LatLng(station.position.lat, station.position.lng),
			map: map,
			title: station.name,
			number: station.number
		});
		marker.addListener('click', function() {
			    //map.setZoom(20);
			    map.setCenter(marker.getPosition());
			    velocityController.stations.getStation(station);
			    velocityController.reservations.closeReservationCard();
			});
		marker.setMap(null);
		velibMap.markers.push(marker);
	},
	showMarkersByLocation(stationNumbers){
		velibMap.markers.forEach(marker => marker.setMap(null));
		velibMap.markers.forEach(function(marker){
			if(stationNumbers.includes(marker.number)){
				marker.setMap(map);
			}
		});
		console.log("End of showMarkersByLocation");
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
			      	velocityController.stations.getStationsByLocation(pos);
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
			velocityController.stations.getStationsByLocation(pos);
		}
	},
	init(lat, lng, canvas, zoom){
		this.center = {
			lat: velibMapSettings.lat, 
			lng: velibMapSettings.lng
		}
		this.canvas = document.getElementById(velibMapSettings.containerId);
		this.options = {center: this.center, zoom: velibMapSettings.zoom};
		this.map();
	}
}

// this.center = new google.maps.LatLng(velibMapSettings.lat, velibMapSettings.lng);