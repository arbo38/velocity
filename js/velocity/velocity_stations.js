'use strict';

var stationsHandler = {
	requestStations: function requestStations() {
		$.ajax({
			url: stationsFromContract,
			type: 'GET',
			dataType: 'json'
		}).done(function (data) {
			data.forEach(function (station) {
				velocityController.googleMap.makeMarker(station);
			});
		}).done(function () {
			velocityController.stations.getStationsByLocation(velibMap.center);
		}).fail(function () {
			alert("Une erreur est survenue lors de la consultation de l'API externe");
			console.warn("An error has occured at velocity_stations.js stationsHandler.requestStations()");
		}).always(function () {
		});
	},
	getStationsByLocation: function getStationsByLocation(location) {
		var lat = location.lat;
		var lng = location.lng;
		var radius = velibMapSettings.radius;
		$.ajax({
			url: 'https://opendata.paris.fr/api/records/1.0/search/?dataset=stations-velib-disponibilites-en-temps-reel&geofilter.distance=' + lat + '%2C' + lng + '%2C' + radius,
			type: 'GET',
			dataType: 'json'
		}).done(function (data) {
			var stations = Array.from(data.records);
			var stationsNumber = stations.map(function (station) {
				return station.fields.number;
			});
			var bikesPerStationNumber = stations.map(function (station) {
				return [station.fields.number, station.fields.available_bikes];
			});
			velocityController.googleMap.showMarkersByLocation(stationsNumber, bikesPerStationNumber);
		}).fail(function () {
			alert("Une erreur est survenue lors de la consultation de l'API externe");
			console.warn("An error has occured at velocity_stations.js stationsHandler.getStationsByLocation()");
		});
	},
	stationSelected: function stationSelected(station) {
		var stationNumber = station.number; 
		var stationFromNumber = 'https://api.jcdecaux.com/vls/v1/stations/' + stationNumber + '?contract=' + contrat + '&apiKey=' + apiKey;
		$.ajax({
			url: stationFromNumber,
			type: 'GET',
			dataType: 'json'
		}).done(function (station) {
			currentStation = station;
		}).done(function (station) {
			velocityController.stations.htmlStationInformation();
		}).fail(function(){
			alert("Une erreur est survenue lors de la consultation de l'API externe");
			console.warn("An error has occured at velocity_stations.js stationsHandler.stationSelected()");
		});
	}
};