"use strict";

var reservationHandler = {
	reservationTime: {
		reservationTimeStamp: "",
		remainingTime: "", // in seconds
		remainingMinutes: "",
		remainingSeconds: ""
	},
	check: function check(create) {
		var currentTime = new Date().getTime();
		if (sessionStorage.reservationState == "true") {
			// Check if reservation has been made during this session
			if (currentTime < Number(sessionStorage.reservationEndTime)) {
				// Check if the reservation is still valid
				if (create === true) {
					// if check() called by new reservation from velocityController.reservations.create(), this reservation must be terminated
					velocityController.reservations.cancel();
				} else {
					this.reservationTime.remainingTime = Math.floor((Number(sessionStorage.reservationEndTime) - currentTime) / 1000); // Remaining time calculation
					this.setTime(false); // set remainingMinutes & remainingSeconds, false means this is not a new reservation
					this.countdown(); // launch countdown
					velocityController.reservations.htmlReservationDisplay(true); // Display reservation in the footer
					cancelReservation.enable(); // activate the cancel button
				}
			} else {
				// If the reservation is not valid
				velocityController.reservations.cancel(); // cancel reservation
			}
		} else {
			// There is no reservation made during this session
			velocityController.reservations.htmlReservationDisplay(false); // Display footer with no reservation
		}
	},
	cancel: function cancel() {
		sessionStorage.reservationState = false;
		reservationHandler.reservationTime.remainingTime = 0;
		footerReservationDisplay.set(false);
		this.countdown(true); // Clear countdown
	},
	store: function store() {
		sessionStorage.reservationState = true; 
		sessionStorage.reservedStationName = currentStation.name.split("-")[1];
		sessionStorage.reservationStartTime = this.reservationTime.reservationTimeStamp;
		sessionStorage.reservationEndTime = this.reservationTime.reservationTimeStamp + settings.reservationValidity * 60 * 1000;
		sessionStorage.reservationRemainingTime = Math.floor(settings.reservationValidity * 60);
	},
	setTime: function setTime(init) {
		if (init === true) { // In case of new reservation, sets the time remaining to the settings @ velocity_settings,
			this.reservationTime.remainingTime = Number(sessionStorage.reservationRemainingTime); // session storage remaining time set @ velocity_reservation => store line 46
		}
		reservationHandler.reservationTime.remainingMinutes = Math.floor(reservationHandler.reservationTime.remainingTime / 60);
		reservationHandler.reservationTime.remainingSeconds = reservationHandler.reservationTime.remainingTime - reservationHandler.reservationTime.remainingMinutes * 60;
	},
	countdown: function countdown(clear) {
		if (clear === true) {
			clearInterval(countdownId);
		}
		if (this.reservationTime.remainingTime > 0) {
			countdownId = setInterval(function () {
				if (reservationHandler.reservationTime.remainingTime <= 0) {
					clearInterval(countdownId);
					velocityController.reservations.cancel(false);
				} else {
					reservationHandler.reservationTime.remainingTime--;
					sessionStorage.reservationRemainingTime = reservationHandler.reservationTime.remainingTime;
					reservationHandler.setTime(false); // not initial setTime but actualisation 
					velocityController.reservations.htmlReservationDisplay(true);
				}
			}, 1000);
		}
	}
}