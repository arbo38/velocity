
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
			number: station.number,
		});
		marker.addListener('click', function() {
			    map.setCenter(marker.getPosition());
			    velocityController.stations.getStation(station);
			    velocityController.reservations.closeReservationCard();
			    if($("body").width() < 992){
			    	window.location.href = "#application";
			    	console.log("link to application");
			    }else {
			    	console.log("no link");
			    }
			});
		marker.setMap(null);
		velibMap.markers.push(marker);
	},
	showMarkersByLocation(stationNumbers, availableBikesPerStations){
		velibMap.markers.forEach(marker => marker.setMap(null));

		velibMap.markers.forEach(function(marker){
			if(stationNumbers.includes(marker.number)){
				var markerStationBikesIndex = availableBikesPerStations.findIndex(function(numberAndBikes){
					return numberAndBikes[0] == marker.number;
				});
				if(markerStationBikesIndex == (-1)){
					console.log(availableBikesPerStations);
					console.log(marker.number);
					console.log(markerStationBikesIndex);
				}
				if(availableBikesPerStations[markerStationBikesIndex][1] > 5 ){
					var image = {
					    url: 'images/station_icones/biker_green.png',
					    // This marker is 20 pixels wide by 32 pixels high.
					    size: new google.maps.Size(64, 64),
					    // The origin for this image is (0, 0).
					    origin: new google.maps.Point(0, 0),
					    // The anchor for this image is the base of the flagpole at (0, 32).
					    anchor: new google.maps.Point(0, 64)
					  };
					  marker.setIcon(image);
				}else if(availableBikesPerStations[markerStationBikesIndex][1] > 0){
					var image = {
					    url: 'images/station_icones/biker_yellow.png',
					    // This marker is 20 pixels wide by 32 pixels high.
					    size: new google.maps.Size(64, 64),
					    // The origin for this image is (0, 0).
					    origin: new google.maps.Point(0, 0),
					    // The anchor for this image is the base of the flagpole at (0, 32).
					    anchor: new google.maps.Point(0, 64)
					  };
					marker.setIcon(image);
				}
				else{
					var image = {
					    url: 'images/station_icones/biker_red.png',
					    // This marker is 20 pixels wide by 32 pixels high.
					    size: new google.maps.Size(64, 64),
					    // The origin for this image is (0, 0).
					    origin: new google.maps.Point(0, 0),
					    // The anchor for this image is the base of the flagpole at (0, 32).
					    anchor: new google.maps.Point(0, 64)
					  };
					marker.setIcon(image);
				}
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