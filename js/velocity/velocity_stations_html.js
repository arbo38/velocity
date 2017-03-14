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
				openReservationPanel.enable();
			}
		}
		else{
			openReservationPanel.disable();
		}
	},
}