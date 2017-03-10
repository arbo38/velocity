
const reservationHandler = {
	reservationTimeStamp: "",
	remainingTime: "", // in seconds
	remainingMinutes: "",
	remainingSeconds: "",
	check(){
		this.countdown();
	},
	create(){
		this.reservationTimeStamp = new Date().getTime();
		this.store();
		this.setTime(true);
		this.display();
		this.countdown();
		
	},
	cancel(){
		sessionStorage.reservationState = false;
		reservationHandler.remainingTime = 0;
		footerReservationDisplay.set(false);
		this.countdown(true);
	},
	store(){
		sessionStorage.reservationState = true;
		sessionStorage.reservedStationName = currentStation.name.split("-")[1];
		sessionStorage.reservationStartTime = this.reservationTimeStamp;
		sessionStorage.reservationEndTime = this.reservationTimeStamp + (settings.reservationValidity * 60 * 1000);;
		sessionStorage.reservationRemainingTime = settings.reservationValidity * 60;
	},
	setTime(init){
		if(init === true){
			this.remainingTime = Math.floor(settings.reservationValidity * 60);
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
			footerReservationDisplay.setValidity(true);
			countdownId = setInterval(function(){
				if(reservationHandler.remainingTime <= 0){
					clearInterval(countdownId);
					footerReservationDisplay.set(false);
					console.log("countdown cleared and footerReservationDisplay set to false");
				}
				else{
					console.log(reservationHandler.remainingTime);
					reservationHandler.remainingTime--;
					sessionStorage.reservationRemainingTime = reservationHandler.remainingTime;
					reservationHandler.setTime(false); // not initial setTime but actualisation 
					reservationHandler.display();
				}
			}, 1000);
		}
	},
	display(){
		footerReservationDisplay.set(true)
	}
}
