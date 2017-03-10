

const apiKey = "0f8b48945bd4f96384ef490b4b5a8ac585471f18";
const contrat = "paris";
const reqListeStationContrat = `https://api.jcdecaux.com/vls/v1/stations?contract=${contrat}&apiKey=${apiKey}`;
const workingURL = "https://api.jcdecaux.com/vls/v1/stations?contract=Paris&apiKey=0f8b48945bd4f96384ef490b4b5a8ac585471f18";	
let map;
let currentStation = {}; 
var countdownId;

const settings = {
	reservationValidity: 0.2,
}