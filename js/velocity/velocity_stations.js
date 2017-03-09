const stationsHandler = {
	requestStations(){
		$.ajax({
			url: reqListeStationContrat,
			type: 'GET',
			dataType: 'json',
		})
		.done(function(data) {
			console.log(data);

			data.forEach(function(station){
				velibMap.makeMarker(station);
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
		const reqListeInfoStation = `https://api.jcdecaux.com/vls/v1/stations/${stationNumber}?contract=${contrat}&apiKey=${apiKey}`;
		$.ajax({
			url: reqListeInfoStation,
			type: 'GET',
			dataType: 'json',
		})
		.done(function(station) {
			currentStation = station;
			console.log(`Requested Station is ${station}`);
			informationStation.set();
			/*$(".station-name").text(station.name.split("-")[1]); => Placer dans informationStation
			$(".station-address").text(station.address);
			$(".station-capacity").text(station.bike_stands);
			$(".station-available-bikes").text(station.available_bikes);
			$(".station-available-stands").text(station.available_bike_stands);
			$(".station-available-bikes").removeClass('label-success label-warning label-danger');
			$(".station-available-stands").removeClass('label-success label-warning label-danger');
			if(station.status == "OPEN"){
				$(".station-status").text("Station Ouverte");
				$(".station-status").removeClass('label-success label-danger');
				$(".station-status").addClass('label label-success');
			}
			else{
				$(".station-status").text("Station Fermée");
				$(".station-status").removeClass('label-success label-danger');
				$(".station-status").addClass('label label-danger');
			}
			if(station.available_bikes > station.bike_stands / 3){
				$(".station-available-bikes").addClass('label label-success');
			}
			else if(station.available_bikes > station.bike_stands / 5){
				$(".station-available-bikes").addClass('label label-warning');
			}
			else{
				$(".station-available-bikes").addClass('label label-danger');
			}
			if(station.available_bike_stands > station.bike_stands / 3){
				$(".station-available-stands").addClass('label label-success');
			}
			else if(station.available_bike_stands > station.bike_stands / 5){
				$(".station-available-stands").addClass('label label-warning');
			}
			else{
				$(".station-available-stands").addClass('label label-danger');
			}
		})
		.fail(function() {
			console.log("error");
			$(".display-error").slideDown("slow");
		})
		.always(function() {
			console.log("complete");*/
		});
	},
};