
function velocityRun(){
	velocityController.googleMap.initialize();
	velocityController.stations.getAllStations();
	velocityController.reservations.check();
	signaturePadHandler.init();
	buttonGlobalInit.initAllButtons();
}