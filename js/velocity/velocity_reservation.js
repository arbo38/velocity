
const reservationHandler = {
	reservationTimeStamp: "",
	remainingTime: "", // in seconds
	remainingMinutes: "",
	remainingSeconds: "",
	check(){
		let currentTime = new Date().getTime();
		if(sessionStorage.reservationState == "true"){ // Test si une réservation a été effectué lors de cette session
			console.log("Une réservation a déjà été effectuée lors de cette cession");
			if(currentTime < Number(sessionStorage.reservationEndTime)){ // Test si la reservation est toujours valide
				console.log("Cette réservation est toujours en cours");
				this.remainingTime = Math.floor((Number(sessionStorage.reservationEndTime) - currentTime) / 1000); // Calcul du temps restant
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
	create(){
		this.reservationTimeStamp = new Date().getTime();
		this.store();
		this.setTime(true);
		velocityController.reservations.htmlReservationDisplay(true);
		this.countdown();
		
	},
	cancel(){
		sessionStorage.reservationState = false;
		reservationHandler.remainingTime = 0;
		footerReservationDisplay.set(false);
		this.countdown(true); // Clear countdown
	},
	store(){
		sessionStorage.reservationState = true;
		sessionStorage.reservedStationName = currentStation.name.split("-")[1];
		sessionStorage.reservationStartTime = this.reservationTimeStamp;
		sessionStorage.reservationEndTime = this.reservationTimeStamp + (settings.reservationValidity * 60 * 1000);
		sessionStorage.reservationRemainingTime = Math.floor(settings.reservationValidity * 60);
	},
	setTime(init){
		if(init === true){
			this.remainingTime = Number(sessionStorage.reservationRemainingTime); 
		}
		reservationHandler.remainingMinutes = Math.floor(reservationHandler.remainingTime / 60);
		reservationHandler.remainingSeconds = reservationHandler.remainingTime - (reservationHandler.remainingMinutes * 60);
	},
	countdown(clear){
		if(clear === true){
			clearInterval(countdownId);
			console.log("countdown cleared");
		}
		if(this.remainingTime > 0){
			//footerReservationDisplay.setValidity(true);
			countdownId = setInterval(function(){
				if(reservationHandler.remainingTime <= 0){
					clearInterval(countdownId);
					velocityController.reservations.htmlReservationDisplay(false);
					console.log("countdown cleared and footerReservationDisplay set to false");
				}
				else{
					console.log(reservationHandler.remainingTime);
					reservationHandler.remainingTime--;
					sessionStorage.reservationRemainingTime = reservationHandler.remainingTime;
					reservationHandler.setTime(false); // not initial setTime but actualisation 
					velocityController.reservations.htmlReservationDisplay(true);
				}
				console.log(reservationHandler.remainingTime);
			}, 1000);
		}
	},
	/*display(){
		footerReservationDisplay.set(true)
	}*/
}
