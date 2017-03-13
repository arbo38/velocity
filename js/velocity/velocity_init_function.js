
function velocityRun(){
	velocityController.googleMap.initialize();
	velocityController.stations.getAllStations();
	velocityController.reservations.check();
	setListeners.set();
	
}