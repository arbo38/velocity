
function velocityRun(){
	createAllButtons();
	velocityController.googleMap.initialize();
	velocityController.stations.getAllStations();
	signaturePadHandler.init();
	velocityController.reservations.check();
}