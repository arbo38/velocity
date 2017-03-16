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
			// Test si une réservation a été effectué lors de cette session
			if (currentTime < Number(sessionStorage.reservationEndTime)) {
				// Test si la reservation est toujours valide
				if (create === true) {
					// if check() called by new reservation from velocityController.reservations.create(), this reservation must be terminated
					velocityController.reservations.cancel();
				} else {
					this.reservationTime.remainingTime = Math.floor((Number(sessionStorage.reservationEndTime) - currentTime) / 1000); // Calcul du temps restant
					this.setTime(false); // Recalcul des minutes et secondes restantes
					this.countdown();
					velocityController.reservations.htmlReservationDisplay(true);
					cancelReservation.enable();
				}
			} else {
				// Si elle n'est plus valide
				velocityController.reservations.cancel(); // Ne pas afficher de réservation
			}
		} else {
			// Si il n'y pas de réservation
			velocityController.reservations.htmlReservationDisplay(false); // Ne pas afficher de réservation
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
		if (init === true) {
			this.reservationTime.remainingTime = Number(sessionStorage.reservationRemainingTime);
		}
		reservationHandler.reservationTime.remainingMinutes = Math.floor(reservationHandler.reservationTime.remainingTime / 60);
		reservationHandler.reservationTime.remainingSeconds = reservationHandler.reservationTime.remainingTime - reservationHandler.reservationTime.remainingMinutes * 60;
	},
	countdown: function countdown(clear) {
		if (clear === true) {
			clearInterval(countdownId);
		}
		if (this.reservationTime.remainingTime > 0) {
			//footerReservationDisplay.setValidity(true);
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