
function velocityRun(){
	velibMap.init(48.847481, 2.399398, "google-map", 18);
	stationsHandler.requestStations();
	setListeners.set();
	reservationHandler.check();
}