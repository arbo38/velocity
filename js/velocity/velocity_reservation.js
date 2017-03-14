
const reservationHandler = {
	reservationTime: {
		reservationTimeStamp: "",
		remainingTime: "", // in seconds
		remainingMinutes: "",
		remainingSeconds: "",
	},
	check(){
		let currentTime = new Date().getTime();
		if(sessionStorage.reservationState == "true"){ // Test si une réservation a été effectué lors de cette session
			console.log("Une réservation a déjà été effectuée lors de cette cession");
			if(currentTime < Number(sessionStorage.reservationEndTime)){ // Test si la reservation est toujours valide
				console.log("Cette réservation est toujours en cours");
				this.reservationTime.remainingTime = Math.floor((Number(sessionStorage.reservationEndTime) - currentTime) / 1000); // Calcul du temps restant
				this.setTime(false); // Recalcul des minutes et secondes restantes
				this.countdown();
				velocityController.reservations.htmlReservationDisplay(true);
			}
			else{ // Si elle n'est plus valide
				console.log("Cette réservation est expirée");
				sessionStorage.reservationState = false;
				velocityController.reservations.htmlReservationDisplay(false);  // Ne pas afficher de réservation
			}
		}
		else{ // Si il n'y pas de réservation
			velocityController.reservations.htmlReservationDisplay(false);   // Ne pas afficher de réservation
			console.log("Il n'y a pas de réservation en cours.");
		}
		
	},
	/*
	create(){
		this.reservationTime.reservationTimeStamp = new Date().getTime();
		this.store();
		this.setTime(true);
		velocityController.reservations.htmlReservationDisplay(true);
		this.countdown();
		
	},*/
	cancel(){
		sessionStorage.reservationState = false;
		reservationHandler.reservationTime.remainingTime = 0;
		footerReservationDisplay.set(false);
		this.countdown(true); // Clear countdown
	},
	store(){
		sessionStorage.reservationState = true;
		sessionStorage.reservedStationName = currentStation.name.split("-")[1];
		sessionStorage.reservationStartTime = this.reservationTime.reservationTimeStamp;
		sessionStorage.reservationEndTime = this.reservationTime.reservationTimeStamp + (settings.reservationValidity * 60 * 1000);
		sessionStorage.reservationRemainingTime = Math.floor(settings.reservationValidity * 60);
	},
	setTime(init){
		if(init === true){
			this.reservationTime.remainingTime = Number(sessionStorage.reservationRemainingTime); 
		}
		reservationHandler.reservationTime.remainingMinutes = Math.floor(reservationHandler.reservationTime.remainingTime / 60);
		reservationHandler.reservationTime.remainingSeconds = reservationHandler.reservationTime.remainingTime - (reservationHandler.reservationTime.remainingMinutes * 60);
	},
	countdown(clear){
		if(clear === true){
			clearInterval(countdownId);
			console.log("countdown cleared");
		}
		if(this.reservationTime.remainingTime > 0){
			//footerReservationDisplay.setValidity(true);
			countdownId = setInterval(function(){
				if(reservationHandler.reservationTime.remainingTime <= 0){
					clearInterval(countdownId);
					velocityController.reservations.htmlReservationDisplay(false);
					console.log("countdown cleared and footerReservationDisplay set to false");
				}
				else{
					console.log(reservationHandler.reservationTime.remainingTime);
					reservationHandler.reservationTime.remainingTime--;
					sessionStorage.reservationRemainingTime = reservationHandler.reservationTime.remainingTime;
					reservationHandler.setTime(false); // not initial setTime but actualisation 
					velocityController.reservations.htmlReservationDisplay(true);
				}
				console.log(reservationHandler.reservationTime.remainingTime);
			}, 1000);
		}
	},
	/*display(){
		footerReservationDisplay.set(true)
	}*/
}
