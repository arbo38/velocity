const buttonGlobalInit = {
	initAllButtons(){
		openReservationPanel.init();
		closeReservationPanel.init();
		locate.init();
		confirmReservation.init();
		cancelReservation.init();
		clearCanvas.init();
	}
}

const openReservationPanel = {
	html: "",
	enable(){
		$(openReservationPanel.html).removeAttr(`disabled`);
	},
	disable(){
		$(openReservationPanel.html).attr(`disabled`, true);
	},
	show(){
		$(openReservationPanel.html).show();
	},
	hide(){
		$(openReservationPanel.html).hide();
	},
	listeners(){
		$(openReservationPanel.html).on('click', function(){
			console.log("click on openReservationPanel");
			openReservationPanel.hide();
		});
	},
	init(){
		this.html = $("#open-reservation-panel-btn");
		this.listeners();
	}
}

const closeReservationPanel = {
	html: "",
	listeners(){
		$(closeReservationPanel.html).on('click', function(){
			console.log("click on closeReservationPanel");
			openReservationPanel.show();
			velocityController.reservations.clearSignatureCanvas();
		});
	},
	init(){
		this.html = $("#close-reservation-panel-btn");
		this.listeners();
	}
}

const locate = {
	html: "",
	listeners(){
		// coming soon
	},
	init(){
		this.html = $("#locate-btn");
	}
}

const confirmReservation = {
	html: "",
	listeners(){ // on click create a new reservation
		$(confirmReservation.html).on("click", function (event) {
		    if (signaturePad.isEmpty()) {
		    	console.log("reseigner signature");
		        alert("Merci de signer avant de valider");
		    } else {
		    	velocityController.reservations.create();
		        console.log("Saved");
		    }
		});
	},
	init(){
		this.html = $("#confirmation-reservation-btn");
		this.listeners();
	}
}

const cancelReservation = {
	html: "",
	enable(){
		$(cancelReservation.html).removeAttr(`disabled`);
	},
	disable(){
		$(cancelReservation.html).attr(`disabled`, true);
	},
	listeners(){ // on click cancel reservation and hide reservation panel
		$(cancelReservation.html).on("click", function(){ 
			velocityController.reservations.cancel();
			velocityController.reservations.closeReservationCard();	
		});
	},
	init(){
		this.html = $("#cancel-reservation-btn");
		this.listeners();
	}
}

const clearCanvas = {
	html: "",
	listeners(){
		$(clearCanvas.html).on("click", function (event) {
			velocityController.reservations.clearSignatureCanvas();
		});
	},
	init(){
		this.html = $("#clear-canvas");
		this.listeners();
	}
}