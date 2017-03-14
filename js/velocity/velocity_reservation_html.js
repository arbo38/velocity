const informationReservation = {
	set(){
		this.setName();
		this.setAddress();
		this.setValidity();
	},
	setName(){
		$("#info-reservation-name").text(currentStation.name.split("-")[1]);
	},
	setAddress(){
		$("#info-reservation-address").text(currentStation.address);
	},
	setValidity(){
		$("#info-reservation-validity").text(`${settings.reservationValidity}mn`);
	}
	
}

const footerReservationDisplay = {
	status: {
		reservation: "Une réservation en cours à la station",
		noReservation: "Aucune réservation en cours",
	},
	set(reservation){
		this.setStatus(reservation);
		this.setValidity(reservation);
		this.setCancelButton(reservation);
	},
	setStatus(reservation){
		if(reservation === true){
			$("#reservation-status").text(`${footerReservationDisplay.status.reservation} ${sessionStorage.reservedStationName}`);
		}
		else{
			$("#reservation-status").text(`${footerReservationDisplay.status.noReservation}`);
			console.log("Réservation status cleared")
		}
	},
	setValidity(reservation){
		if(reservation === true){
			$("#countdown-status").text(`La réservation expirera dans ${reservationHandler.reservationTime.remainingMinutes}mn et ${reservationHandler.reservationTime.remainingSeconds}s`);
		}
		else{
			$("#countdown-status").text(" ");
			console.log("Validity cleared");
		}
	},
	setCancelButton(reservation){
		if(reservation === true){
			$("#reservation-cancel-button").removeAttr(`disabled`);
		}
		else{
			$("#reservation-cancel-button").attr(`disabled`, true);
			console.log("cancel button disabled");
		}
	}
}

const cardReveal = {
	show(){
		// Handle by materialize
	},
	hide(){ // called by page_objects / setListeners.cancelReservationButtonListener
		if($('.card-reveal').css("display") != "none"){
			$('.card-reveal').velocity(
				{translateY: 0}, {
					duration: 225,
					queue: false,
					easing: 'easeInOutQuad',
					complete: function() { $(this).css({ display: 'none'}); }
				}
			);
			openReservationPanel.show(); // Afficher le bouton de Réservation
		}
		
		
	}
}