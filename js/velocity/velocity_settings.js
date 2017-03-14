
// Global variables

let map;
let currentStation = {}; 
let countdownId;
let signaturePad;

// Settings

const apiKey = "0f8b48945bd4f96384ef490b4b5a8ac585471f18";
const contrat = "paris";
const stationsFromContract = `https://api.jcdecaux.com/vls/v1/stations?contract=${contrat}&apiKey=${apiKey}`;
const workingURL = "https://api.jcdecaux.com/vls/v1/stations?contract=Paris&apiKey=0f8b48945bd4f96384ef490b4b5a8ac585471f18";	


const settings = {
	reservationValidity: 1,
}

const velibMapSettings = {
	lat: 48.847481,
	lng: 2.399398,
	containerId: "google-map",
	zoom: 16
}