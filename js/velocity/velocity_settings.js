'use strict';

// Global variables

var map = void 0;
var currentStation = {
	address: '',
	available_bike_stands: '',
	available_bikes: '',
	banking: '',
	bike_stands: '',
	bonus: '',
	false: '',
	contract_name: '',
	last_update: '',
	name: '',
	number: '',
	positionObject: {
		lat: '',
		lng: ''
	},
	status: ''
};
var countdownId = void 0;
var signaturePad = void 0;

// Settings

var apiKey = "0f8b48945bd4f96384ef490b4b5a8ac585471f18";
var contrat = "paris";
var stationsFromContract = 'https://api.jcdecaux.com/vls/v1/stations?contract=' + contrat + '&apiKey=' + apiKey;
var settings = {
<<<<<<< HEAD
	reservationValidity: 20
=======
	reservationValidity: 20 // Reservation duration in minutes
>>>>>>> f147a00da0f23f5bd1993a3c596e60b0e343609f
};
var velibMapSettings = {
	lat: 48.847481,
	lng: 2.399398,
	radius: 1000, // Radius in metters use by velocityController.stations.getStationsByLocation;
	containerId: "google-map",
	zoom: 16,
	locate: {
		geolocation: true,
		location: {
			lat: '',
			lng: ''
		},
		fakeUserLocations: [{ lat: 48.869496, lng: 2.316421 }, { lat: 48.842023, lng: 2.356963 }, { lat: 48.846975, lng: 2.396777 }, { lat: 48.843461, lng: 2.322247 }, { lat: 48.859675, lng: 2.352640 }]
	}
};
