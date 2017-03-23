"use strict";

var informationReservation = {
	set: function set() {
		this.setName();
		this.setAddress();
		this.setValidity();
	},
	setName: function setName() {
		$("#info-reservation-name").text(currentStation.name.split("-")[1]);
	},
	setAddress: function setAddress() {
		$("#info-reservation-address").text(currentStation.address);
	},
	setValidity: function setValidity() {
		$("#info-reservation-validity").text(settings.reservationValidity + "mn");
	}
};

var footerReservationDisplay = {
	status: {
		reservation: "Une réservation en cours à la station",
		noReservation: "Aucune réservation en cours"
	},
	set: function set(reservation) {
		this.setStatus(reservation);
		this.setValidity(reservation);
		this.setCancelButton(reservation);
	},
	setStatus: function setStatus(reservation) {
		if (reservation === true) {
			$("#reservation-status").text(footerReservationDisplay.status.reservation + " " + sessionStorage.reservedStationName);
		} else {
			$("#reservation-status").text("" + footerReservationDisplay.status.noReservation);
		}
	},
	setValidity: function setValidity(reservation) {
		if (reservation === true) {
			$("#countdown-status").text("La r\xE9servation expirera dans " + reservationHandler.reservationTime.remainingMinutes + "mn et " + reservationHandler.reservationTime.remainingSeconds + "s");
		} else {
			$("#countdown-status").text(" ");
		}
	},
	setCancelButton: function setCancelButton(reservation) {
		if (reservation === true) {
			$("#reservation-cancel-button").removeAttr("disabled");
		} else {
			$("#reservation-cancel-button").attr("disabled", true);
		}
	}
};

var cardReveal = {
	show: function show() {
		// Handle by materialize
	},
	hide: function hide() {
		// called by page_objects / setListeners.cancelReservationButtonListener
		if ($('.card-reveal').css("display") != "none") {
			$('.card-reveal').velocity({ translateY: 0 }, {
				duration: 225,
				queue: false,
				easing: 'easeInOutQuad',
				complete: function complete() {
					$(this).css({ display: 'none' });
				}
			});
			openReservationPanel.show(); // Display the menu button of the information panel
		}
	}
};