
function velocityRun(){
	velibMap.init(48.847481, 2.399398, "google-map", 18);
	velibMap.map();
	console.log("velocityRun done");
	stationsHandler.requestStations();
	//reservationHandler.checkReservation();
}