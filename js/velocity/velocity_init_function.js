
function velocityRun(){
	velocityController.googleMap.initialize();
	velocityController.stations.getAllStations();
	signaturePadHandler.init();
	buttonGlobalInit.initAllButtons();
	velocityController.reservations.check();
}