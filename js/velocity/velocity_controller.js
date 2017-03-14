console.log("controller declared");

const velocityController = {
	googleMap: { // @ velocity_map.js/velibMap
		initialize(){ // uses settings @ velocity_settings.js/velibMapSettings
			velibMap.init();  // called by velocityRun() @ velocity_init_function.js
		},
		makeMarker(station){ // uses data from API @ velocity_stations/stationsHandler.requestStations 
			velibMap.makeMarker(station); // calls to VC.station.getStation()
		},
		locate(){
			velibMap.locate();
		}
	},
	stations: { // uses settings @ velocity_settings.js/stationsFromContract
		getAllStations(){ // called by function velocityRun() @ velocity_init_function.js
			stationsHandler.requestStations(); // calls to VC.googleMap.makeMarker()
		},
		getStation(station){
			stationsHandler.stationSelected(station); // calls to VC.stations.htmlStationInformation()
		},
		htmlStationInformation(){ // called by stationsHandler.stationSelected @ velocity_stations.js
			informationStation.set(); // uses global variable currentStation @ velocity_settings.js/currentStation
		}
	},
	reservations: { // velocity_reservation.js/reservationHandler
		check(create){ // called by velocityRun() @ velocity_init_function.js on page load
			if(create === true){
				reservationHandler.check(true);
			} else{
				reservationHandler.check(); // calls to .htmlReservationDisplay()
			}
			
		},
		create(){
			velocityController.reservations.check(true);
			currentStation.available_bikes--;
			reservationHandler.reservationTime.reservationTimeStamp = new Date().getTime();
			reservationHandler.store(); // Store via webstorage reservation information
			reservationHandler.setTime(true); // true is for a new reservation
			this.htmlReservationDisplay(true); // Display information in the footer
			reservationHandler.countdown();
			velocityController.reservations.clearSignatureCanvas();
			openReservationPanel.show(); // Réaffichage du bouton open-reservation-panel-btn
			cancelReservation.enable();
			velocityController.reservations.closeReservationCard();
		},
		cancel(){
			reservationHandler.cancel(); // calls to .htmlReservationDisplay()
			cancelReservation.disable();
			if(sessionStorage.reservedStationName == currentStation.name.split("-")[1]){
				currentStation.available_bikes++;
				velocityController.stations.htmlStationInformation();
			}
		},
		closeReservationCard(){ // @ velocity_page_objects/cardReveal
			cardReveal.hide();
			velocityController.stations.htmlStationInformation();
		},
		clearSignatureCanvas(){
			signaturePad.clear();
		},
		htmlReservationDisplay(reservation){ // reservation = true (there is a reservation) or false
			footerReservationDisplay.set(reservation); // Display reservation information and countdown in the page footer
		}
	}
}