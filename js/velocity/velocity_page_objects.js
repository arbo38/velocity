
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
	actionButtonAction(type){
		if(type === true){
			$("#info-station-action-btn").show();
		}
		else{
			$("#info-station-action-btn")
			.hide()
			.removeClass('active');
		}
	}, 
	actionButtonListener(type){
		$("#info-station-action-btn").on("click", function(){ // Cacher le bouton d'action
			informationStation.actionButtonAction(false);
			informationReservation.set();
		});
		$("#close-reservation-panel").on("click", function(){ // Afficher le bouton d'action
			informationStation.actionButtonAction(true);
		});
	},
};

const informationReservation = {
	set(){
		this.setName();
		this.setAddress();
		this.setValidity()
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