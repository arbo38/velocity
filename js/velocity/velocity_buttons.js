
class Button{ // Class managing buttons
	constructor(selector, listener = false){
		this.html = $(selector);
		if(listener){
			this.listener = listener;
			this.listener();
		}
		
	}
	enable(){
		$(this.html).removeAttr("disabled");
	}
	disable(){
		$(this.html).attr("disabled", true);
	}
	show(){
		$(this.html).show();
	}
	hide(){
		$(this.html).hide();
	}
	deactivate(){
		$(this.html).removeClass('active');
	}
}

/* List of buttons listeners used for their initialization */

function openReservationPanelListener(){
	$(this.html).on('click', function () {
		infoStationMenu.hide();
		openReservationPanel.hide();
		infoStationMenu.deactivate();
		signatureMenu.deactivate();
		velocityController.reservations.htmlReservationPanelInformation();
	});
} 

function closeReservationPanelListener(){
	$(this.html).on('click', function () {
		infoStationMenu.show();
		openReservationPanel.show();
		velocityController.reservations.clearSignatureCanvas();
		infoStationMenu.deactivate();
	});
} 

function locateListener(){
	$(this.html).on('click', function () {
		velocityController.googleMap.locate();
	});
} 

function confirmReservationListener(){
	$(this.html).on('click', function () {
		if (signaturePad.isEmpty()) {
			alert("Merci de signer avant de valider");
		} else {
			velocityController.reservations.create();
			infoStationMenu.show();
			signatureMenu.deactivate();
		}
	});
} 

function cancelReservationListener(){
	$(this.html).on('click', function () {
		velocityController.reservations.cancel();
		velocityController.reservations.closeReservationCard();
		cancelReservation.disable();
	});
} 

function clearCanvasListener(){
	$(this.html).on('click', function () {
		velocityController.reservations.clearSignatureCanvas();
	});
}

function infoStationMenuListener(){
	$(this.html).on('click', function () {
			// Empty listener, ready to be used if something needs to be added to this button
		});
	$(document).click(function(event) { 
		if(!$(event.target).closest('#info-station-action-btn').length) {
			if($('#info-station-action-btn').hasClass("active")) {
				$('#info-station-action-btn').removeClass("active");
			}
		}        
	})

} 

function signatureMenuListener(){
	$(this.html).on('click', function () {
			// Empty listener, ready to be used if something needs to be added to this button
		});
	$(document).click(function(event) { 
		if(!$(event.target).closest('#signature-action-btn').length) {
			if($('#signature-action-btn').hasClass("active")) {
				$('#signature-action-btn').removeClass("active");
			}
		}        
	})
} 

/* Buttons initializations */

/* Declaring buttons as global variables */

	// Menu button information station card
	var infoStationMenu;
	var locate;
	var openReservationPanel;
	// Menu button reservation card
	var signatureMenu;
	var confirmReservation;
	var clearCanvas;
	// Other buttons
	var closeReservationPanel;
	var cancelReservation;

	/* Initialize all buttons by calling this function @velocity_init-function */

	function createAllButtons(){
		infoStationMenu = new Button("#info-station-action-btn", infoStationMenuListener);
		locate = new Button("#locate-btn", locateListener);
		openReservationPanel = new Button("#open-reservation-panel-btn", openReservationPanelListener);

		signatureMenu = new Button("#signature-action-btn", signatureMenuListener);
		confirmReservation = new Button("#confirmation-reservation-btn", confirmReservationListener);
		clearCanvas = new Button("#clear-canvas", clearCanvasListener);

		closeReservationPanel = new Button("#close-reservation-panel-btn", closeReservationPanelListener);
		cancelReservation = new Button("#cancel-reservation-btn", cancelReservationListener);
	}







