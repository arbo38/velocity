'use strict';

var sliderSetting = {
	autoplay: true,
	ratio: 5 / 12, // Exprime la hauteur du slider comme fraction de sa largeur
	duration: 5000, // Durée en milisecondes de présentation de chaque slide
	displayControls: true, // Défini si les boutons de controls du slider sont visibles
	startingSlide: 0,
	sliderElements: {
		sliderContainer: 'slider-container', // ID du slider conteneur
		slider: 'slider', // ID du slider (ul contenant les slides sous forme de li)
		slides: '.slide' },
	controlElements: {
		controlContainer: 'control-container', // ID du conteneur des boutons de control
		pause: {
			id: 'pause', // ID du bouton pause
			iconeId: 'pause-icone' // ID de l'icone pause
		},
		next: {
			id: 'next', // ID du bouton next
			iconeId: 'next-icone' //ID de l'icone next
		},
		previous: {
			id: 'previous', // ID du bouton previous
			iconeId: 'previous-icone' // ID de l'icone previous
		}
	}
};

var slideInterval = void 0; // Rend accessible globalement l'interval d'affichage du slider et permet de le clear