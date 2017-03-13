
const informationStation = {
	set(){
		this.setName();
		this.setStatus();
		this.setAddress();
		this.setCapacity();
		this.setAvailableBikes();
		this.setAvailableStands();
		this.enableActionButton(true);
	},
	setName(){
		$("#info-station-name").text(currentStation.name.split("-")[1]);
	},
	setStatus(){
		if(currentStation.status == "OPEN"){
			$("#info-station-status").text("Station Ouverte");
			$("#info-station-status").removeClass('label-success label-danger');
			$("#info-station-status").addClass('label label-success');
		}
		else{
			$("#info-station-status").text("Station Fermée");
			$("#info-station-status").removeClass('label-success label-danger');
			$("#info-station-status").addClass('label label-danger');
		}
	},
	setAddress(){
		$("#info-station-address").text(currentStation.address);
	},
	setCapacity(){
		$("#info-station-capacity").text(currentStation.bike_stands);
	},
	setAvailableBikes(){
		// Removing previous labels
		$("#info-station-available-bikes").removeClass('label-success label-warning label-danger');
		// Setting new information
		$("#info-station-available-bikes").text(currentStation.available_bikes);
		// Setting new label
		if(currentStation.available_bikes > currentStation.bike_stands / 3){
			$("#info-station-available-bikes").addClass('label label-success');
		}
		else if(currentStation.available_bikes > currentStation.bike_stands / 5){
			$("#info-station-available-bikes").addClass('label label-warning');
		}
		else{
			$("#info-station-available-bikes").addClass('label label-danger');
		}
	},
	setAvailableStands(){
		// Removing previous labels
		$("#info-station-available-stands").removeClass('label-success label-warning label-danger');
		// Setting new information
		$("#info-station-available-stands").text(currentStation.available_bike_stands);
		// Setting new label
		if(currentStation.available_bike_stands > currentStation.bike_stands / 3){
			$("#info-station-available-stands").addClass('label label-success');
		}
		else if(currentStation.available_bike_stands > currentStation.bike_stands / 5){
			$("#info-station-available-stands").addClass('label label-warning');
		}
		else{
			$("#info-station-available-stands").addClass('label label-danger');
		}
	},
	enableActionButton(param){
		if(param === true){
			if(currentStation.available_bikes > 0){
				$("#open-reservation-panel-btn").removeAttr('disabled');
			}
		}
		else{
			$("#open-reservation-panel-btn").attr('disabled');
		}
	},
	actionButtonAction(show){
		if(show === true){
			$("#info-station-action-btn").show();
		}
		else{
			if($("#info-station-action-btn").attr("disabled") !== "disabled"){
				$("#info-station-action-btn")
					.hide()
					.removeClass('active');
					informationReservation.set();
			}
		}
	}
};

const setListeners = { // called by init_function / velocityRun()
	set(){
		this.actionButtonListener();
		this.cancelReservationButtonListener();
	},
	actionButtonListener(){
		$("#open-reservation-panel-btn").on("click", function(){ // Cacher le bouton d'action
			informationStation.actionButtonAction(false);
			signatureScript();
			
		});
		$("#close-reservation-panel").on("click", function(){ // Afficher le bouton d'action
			informationStation.actionButtonAction(true);
		});
	},
	cancelReservationButtonListener(){
		$("#reservation-cancel-button").on("click", function(){ // Afficher le bouton d'action
			reservationHandler.cancel();
			cardReveal.hide();
		});
	}
}

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
			console.log("test");
		}
		else{
			$("#reservation-status").text(`${footerReservationDisplay.status.noReservation}`);
			console.log("Réservation status cleared")
		}
	},
	setValidity(reservation){
		if(reservation === true){
			$("#countdown-status").text(`La réservation expirera dans ${reservationHandler.remainingMinutes}mn et ${reservationHandler.remainingSeconds}s`);
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

	},
	hide(){ // called by page_objects / setListeners.cancelReservationButtonListener
		$('.card-reveal').velocity(
			{translateY: 0}, {
				duration: 225,
				queue: false,
				easing: 'easeInOutQuad',
				complete: function() { $(this).css({ display: 'none'}); }
			}
		);
		informationStation.actionButtonAction(true); // Afficher le bouton de Réservation
	}
}
