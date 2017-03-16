"use strict";

var buttonGlobalInit = {
	initAllButtons: function initAllButtons() {
		openReservationPanel.init();
		closeReservationPanel.init();
		locate.init();
		confirmReservation.init();
		cancelReservation.init();
		clearCanvas.init();
	}
};

var openReservationPanel = {
	html: "",
	enable: function enable() {
		$(openReservationPanel.html).removeAttr("disabled");
	},
	disable: function disable() {
		$(openReservationPanel.html).attr("disabled", true);
	},
	show: function show() {
		$(openReservationPanel.html).show();
	},
	hide: function hide() {
		$(openReservationPanel.html).hide();
	},
	listeners: function listeners() {
		$(openReservationPanel.html).on('click', function () {
			openReservationPanel.hide();
			velocityController.reservations.htmlReservationPanelInformation();
		});
	},
	init: function init() {
		this.html = $("#open-reservation-panel-btn");
		this.listeners();
	}
};

var closeReservationPanel = {
	html: "",
	listeners: function listeners() {
		$(closeReservationPanel.html).on('click', function () {
			openReservationPanel.show();
			velocityController.reservations.clearSignatureCanvas();
		});
	},
	init: function init() {
		this.html = $("#close-reservation-panel-btn");
		this.listeners();
	}
};

var locate = {
	html: "",
	listeners: function listeners() {
		$(locate.html).on("click", function (event) {
			velocityController.googleMap.locate();
		});
	},
	init: function init() {
		this.html = $("#locate-btn");
		this.listeners();
	}
};

var confirmReservation = {
	html: "",
	listeners: function listeners() {
		// on click create a new reservation
		$(confirmReservation.html).on("click", function (event) {
			if (signaturePad.isEmpty()) {
				alert("Merci de signer avant de valider");
			} else {
				velocityController.reservations.create();
			}
		});
	},
	init: function init() {
		this.html = $("#confirmation-reservation-btn");
		this.listeners();
	}
};

var cancelReservation = {
	html: "",
	enable: function enable() {
		$(cancelReservation.html).removeAttr("disabled");
	},
	disable: function disable() {
		$(cancelReservation.html).attr("disabled", true);
	},
	listeners: function listeners() {
		// on click cancel reservation and hide reservation panel
		$(cancelReservation.html).on("click", function () {
			velocityController.reservations.cancel();
			velocityController.reservations.closeReservationCard();
		});
	},
	init: function init() {
		this.html = $("#cancel-reservation-btn");
		this.listeners();
	}
};

var clearCanvas = {
	html: "",
	listeners: function listeners() {
		$(clearCanvas.html).on("click", function (event) {
			velocityController.reservations.clearSignatureCanvas();
		});
	},
	init: function init() {
		this.html = $("#clear-canvas");
		this.listeners();
	}
};