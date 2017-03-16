
class Button{ // Class managing buttons
	constructor(selector, listener){
		this.html = $(selector);
		this.listener = listener;
		this.listener();
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
}

/* List of buttons listeners used for their initialization */

function openReservationPanelListener(){
	$(this.html).on('click', function () {
			openReservationPanel.hide();
			velocityController.reservations.htmlReservationPanelInformation();
	});
} 

function closeReservationPanelListener(){
	$(this.html).on('click', function () {
			openReservationPanel.show();
			velocityController.reservations.clearSignatureCanvas();
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

/* Buttons initializations */

var openReservationPanel;
var closeReservationPanel;
var locate;
var confirmReservation;
var cancelReservation;
var clearCanvas;

function createAllButtons(){
	openReservationPanel = new Button("#open-reservation-panel-btn", openReservationPanelListener);
	closeReservationPanel = new Button("#close-reservation-panel-btn", closeReservationPanelListener);
	locate = new Button("#locate-btn", locateListener);
	confirmReservation = new Button("#confirmation-reservation-btn", confirmReservationListener);
	cancelReservation = new Button("#cancel-reservation-btn", cancelReservationListener);
	clearCanvas = new Button("#clear-canvas", clearCanvasListener);
}

