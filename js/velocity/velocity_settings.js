
// Global variables

let map;
let currentStation = {
	address: '',
	available_bike_stands:'',
	available_bikes:'',
	banking:'',
	bike_stands:'',
	bonus:'',
	false:'',
	contract_name:'',
	last_update:'',
	name:'',
	number:'',
	positionObject:{
		lat:'',
		lng:''
	},
	status:''
}
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
	zoom: 16,
	locate:{
		geolocation: false,
		location: {
			lat: '',
			lng: ''
		},
		fakeUserLocations: [
		{lat:48.869496, lng:2.316421},
		{lat:48.842023, lng:2.356963},
		{lat:48.846975, lng:2.396777},
		{lat:48.843461, lng:2.322247},
		{lat:48.859675, lng:2.352640}
		]
	}
}