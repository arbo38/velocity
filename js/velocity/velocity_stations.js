const stationsHandler = {
	requestStations(){
		$.ajax({
			url: stationsFromContract,
			type: 'GET',
			dataType: 'json',
		})
		.done(function(data) {
			data.forEach(function(station){
				velocityController.googleMap.makeMarker(station);
			});

		})
		.done(function(){
			velocityController.stations.getStationsByLocation(velibMap.center);
		})
		.fail(function() {
			console.log("error");
			$(".display-error").slideDown("slow");
		})
		.always(function() {
			console.log("Request Stations Done");
		});
	},
	getStationsByLocation(location){
		let lat = location.lat;
		let lng = location.lng;
		let radius = velibMapSettings.radius;
		$.ajax({
			url: `https://opendata.paris.fr/api/records/1.0/search/?dataset=stations-velib-disponibilites-en-temps-reel&geofilter.distance=${lat}%2C${lng}%2C${radius}`,
			type: 'GET',
			dataType: 'json',
		})
		.done(function(data) {
			console.log(data);
			var stations = Array.from(data.records);
			console.log(stations);
			var stationsNumber = stations.map(function(station){
				return station.fields.number}
				);
			velocityController.googleMap.showMarkersByLocation(stationsNumber);
			console.log(stationsNumber);
			})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("Request Stations by location Done");
		});
	},
	stationSelected(station){
		console.log(station);
		const stationNumber = station.number; //Number(station.name.split("-")[0]);
		const stationFromNumber = `https://api.jcdecaux.com/vls/v1/stations/${stationNumber}?contract=${contrat}&apiKey=${apiKey}`;
		$.ajax({
			url: stationFromNumber,
			type: 'GET',
			dataType: 'json',
		})
		.done(function(station) {
			currentStation = station;
			console.log("Request Station Done");
		})
		.done(function(station) {
			velocityController.stations.htmlStationInformation();
		});
	},
};