"use strict";

var velocityController = {
	googleMap: {
		// @ velocity_map.js/velibMap
		initialize: function initialize() {
			// uses settings @ velocity_settings.js/velibMapSettings
			velibMap.init(); // called by velocityRun() @ velocity_init_function.js
		},
		makeMarker: function makeMarker(station) {
			// uses data from API @ velocity_stations/stationsHandler.requestStations 
			velibMap.makeMarker(station); // calls to VC.station.getStation()
		},
		showMarkersByLocation: function showMarkersByLocation(stationsNumber, bikesPerStationNumber) { // uses data from API @ velocity_stations/stationsHandler.requestStationsByLocation
			velibMap.showMarkersByLocation(stationsNumber, bikesPerStationNumber);
		},
		locate: function locate() { // Call by the locate button @ velocity_buttons/locate
			velibMap.locate(); 
		}
	},
	stations: {
		// uses settings @ velocity_settings.js/stationsFromContract
		getAllStations: function getAllStations() {
			// called by function velocityRun() @ velocity_init_function.js
			stationsHandler.requestStations(); // calls to VC.googleMap.makeMarker()
		},
		getStationsByLocation: function getStationsByLocation(location) {
			stationsHandler.getStationsByLocation(location); // calls to VC.googleMap.showMarkersByLocation()
		},
		getStation: function getStation(station) {
			stationsHandler.stationSelected(station); // calls to VC.stations.htmlStationInformation()
		},
		htmlStationInformation: function htmlStationInformation() {
			// called by stationsHandler.stationSelected @ velocity_stations.js
			informationStation.set(); // uses global variable currentStation @ velocity_settings.js/currentStation
		}
	},
	reservations: {
		// velocity_reservation.js/reservationHandler
		check: function check(create) {
			// called by velocityRun() @ velocity_init_function.js on page load
			if (create === true) {
				reservationHandler.check(true);
			} else {
				reservationHandler.check(); // calls to .htmlReservationDisplay()
			}
		},
		create: function create() {
			velocityController.reservations.check(true);
			currentStation.available_bikes--;
			reservationHandler.reservationTime.reservationTimeStamp = new Date().getTime();
			reservationHandler.store(); // Store via webstorage reservation information
			reservationHandler.setTime(true); // true is for a new reservation
			this.htmlReservationDisplay(true); // Display information in the footer
			reservationHandler.countdown(); // starts the countdown
			velocityController.reservations.clearSignatureCanvas();
			openReservationPanel.show(); // Display open-reservation-panel-btn
			cancelReservation.enable(); // Enable the cancel reservation button
			velocityController.reservations.closeReservationCard(); // close the reservation card
		},
		cancel: function cancel() {
			reservationHandler.cancel(); // calls to .htmlReservationDisplay()
			cancelReservation.disable(); // Disable the cancel reservation button
			velocityController.reservations.htmlReservationDisplay();
			if (sessionStorage.reservedStationName == currentStation.name.split("-")[1]) { // If the reservation is canceled in the current station displayed, add 1 bike
				currentStation.available_bikes++;
				velocityController.stations.htmlStationInformation();
			}
		},
		closeReservationCard: function closeReservationCard() {
			// @ velocity_page_objects/cardReveal
			cardReveal.hide();
			velocityController.stations.htmlStationInformation();
		},
		clearSignatureCanvas: function clearSignatureCanvas() { // Call by clear-canvas button @ velocity_buttons/clear-canvas
			signaturePad.clear();
		},
		htmlReservationPanelInformation: function htmlReservationPanelInformation() {
			informationReservation.set();
		},
		htmlReservationDisplay: function htmlReservationDisplay(reservation) {
			// reservation = true (there is a reservation) or false
			footerReservationDisplay.set(reservation); // Display reservation information and countdown in the page footer
		}
	}
};