requestStations(){
		$.ajax({
			url: "https://opendata.paris.fr/api/records/1.0/search/?dataset=stations-velib-disponibilites-en-temps-reel&geofilter.distance=48.8520930694%2C2.34738897685%2C1000",
			type: 'GET',
			dataType: 'json',
		})
		.done(function(data) {
			console.log(data);
			})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("Request Stations Done");
		});
	},

	https://opendata.paris.fr/api/records/1.0/search/?dataset=stations-velib-disponibilites-en-temps-reel&geofilter.distance=48.8520930694%2C2.34738897685%2C1000