# Velocity

## What does it do

The goal of the velocity website is to provide an easy way to locate one of the many (close to 1200) velib's stations in Paris and to be able to reserve a bike in this station.

## How it works

First of all, Velocity uses the Paris OPEN-DATA API, you can check it out at https://opendata.paris.fr/api/v1/documentation
To display the information we use google map API, you can check it out at https://developers.google.com/maps/documentation/javascript/?hl=fr
To allow our user to sign uppon their reservation we use _szimek_ signature_pad, more information at https://github.com/szimek/signature_pad
We also use Jquery.
Concerning the design of the page we use materializecss, which is an implementation of Google Material Design recomendations, more info at http://materializecss.com/ and https://material.io/guidelines/.

All javascript specific to velocity can be found in the js/velocity folder.

The code architecture is divided by main purposes using the following logic : 

	* velocity_buttons : handles and declare all the buttons of the application
	* velocity_controller : hosts the _velocityController_ which is the main dispatch controller of the application
	* velocity_settings : hosts all the settings (API key, reservation duration etc..) of the application
	* velocity_map : hosts the _velibMap_ object, handles the integration and interaction with the google map
	* velocity_reservation : hosts the _reservationHandler_ object, handles all part of the reservation process
	* velocity_reservation_html : hosts the _informationReservation_, _footerReservationDisplay_ and _cardReveal_ objects, all used to display information about the reservation in our web page
	* velocity_signature_pad : hosts the _signaturePadHandler_ object  used to display the reservation signature canvas
	* velocity_stations : hosts the _stationsHandler_ object used to request the informations about stations from the API
	* velocity_stations_html : hosts the informationStation used to display information about the current selected station in our web page

All the actions are passed through the velocityController (dispatch) except for the buttons which can call and action through one an other, themselves, or through the velocityController.

