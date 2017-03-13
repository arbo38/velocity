const stationsHandler = {
	requestStations(){
		$.ajax({
			url: stationsFromContract,
			type: 'GET',
			dataType: 'json',
		})
		.done(function(data) {
			console.log(data);

			data.forEach(function(station){
				velocityController.googleMap.makeMarker(station);
			});

		})
		.fail(function() {
			console.log("error");
			$(".display-error").slideDown("slow");
		})
		.always(function() {
			console.log("complete");
		});
	},
	stationSelected(station){
		console.log(station);
		const stationNumber = Number(station.name.split("-")[0]);
		const stationFromNumber = `https://api.jcdecaux.com/vls/v1/stations/${stationNumber}?contract=${contrat}&apiKey=${apiKey}`;
		$.ajax({
			url: stationFromNumber,
			type: 'GET',
			dataType: 'json',
		})
		.done(function(station) {
			currentStation = station;
			console.log(`Requested Station is ${station}`);
			velocityController.stations.htmlStationInformation();
		});
	},
};