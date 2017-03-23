"use strict";

var velibMap = {
	center: "",
	canvas: "",
	options: {},
	markers: [],
	map: function (_map) {
		function map() {
			return _map.apply(this, arguments);
		}

		map.toString = function () {
			return _map.toString();
		};

		return map;
	}(function () {
		map = new google.maps.Map(this.canvas, this.options);
		map.addListener('dragend', function () {
			setTimeout(function () {
				var newCenter = {
					lat: map.getCenter().lat(),
					lng: map.getCenter().lng()
				};
				velocityController.stations.getStationsByLocation(newCenter);
			}, 500);
		});
		map.addListener('click', function (event) {
			var clickLocation = {
				lat: event.latLng.lat(),
				lng: event.latLng.lng()
			};
			velocityController.stations.getStationsByLocation(clickLocation);
		});
	}),
	makeMarker: function makeMarker(station) {
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(station.position.lat, station.position.lng),
			map: map,
			title: station.name,
			number: station.number
		});
		marker.addListener('click', function () {
			map.setCenter(marker.getPosition()); // Center the map on the marker when clicked
			velocityController.stations.getStation(station); // Get information of the station through the API
			velocityController.reservations.closeReservationCard(); // If the reservation panel was open, close is to display the information of station
			infoStationMenu.show(); // Show the menu button of the information panel
			if ($("body").width() < 992) { // If the screen is too small like on mobile, scroll to the information card to display the station selected informations
				window.location.href = "#application";
			} 
		});
		marker.setMap(null);
		velibMap.markers.push(marker);
	},
	showMarkersByLocation: function showMarkersByLocation(stationNumbers, availableBikesPerStations) {
		velibMap.markers.forEach(function (marker) {
			return marker.setMap(null); // Hides all marker
		});

		velibMap.markers.forEach(function (marker) {
			if (stationNumbers.includes(marker.number)) { // Check what marker are the ones of the stations we want to display
				var markerStationBikesIndex = availableBikesPerStations.findIndex(function (numberAndBikes) {
					return numberAndBikes[0] == marker.number; // Look for the index of the station number of the marker to match resolve the number of bikes for the marker
				});
				if (markerStationBikesIndex == -1) {
					console.warn("No index found by showMarkersByLocation for this marker in the station to display array, check information bellow");
					console.warn(availableBikesPerStations);
					console.warn(marker.number);
					console.warn(markerStationBikesIndex);
				}
				if (availableBikesPerStations[markerStationBikesIndex][1] > 5) { // If there is more than 5 bikes available, display in green the station's icon
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
				} else if (availableBikesPerStations[markerStationBikesIndex][1] > 0) { // If there at least 1 bikes available, display in orange the station's icon
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
				} else { // If there is 0 bikes available, display in red the station's icon
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
	},
	locate: function locate() {
		if (velibMapSettings.locate.geolocation) {
			// If settings OK to use user location
			if (navigator.geolocation) {
				var infoWindow = new google.maps.InfoWindow({ map: map });
				navigator.geolocation.getCurrentPosition(function (position) {
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
		} else {
			// Use fake location (for test purposes in case user is not in Paris)
			var infoWindow = new google.maps.InfoWindow({ map: map });
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
	init: function init(lat, lng, canvas, zoom) {
		this.center = {
			lat: velibMapSettings.lat,
			lng: velibMapSettings.lng
		};
		this.canvas = document.getElementById(velibMapSettings.containerId);
		this.options = { center: this.center, zoom: velibMapSettings.zoom };
		this.map();
	}
};

// this.center = new google.maps.LatLng(velibMapSettings.lat, velibMapSettings.lng);