
const sliderSetting = {
	autoplay: true,
	ratio: 3/6, // Exprime la hauteur du slider comme fraction de sa largeur
	duration: 5000, // Durée en milisecondes de présentation de chaque slide
	displayControls: true, // Défini si les boutons de controls du slider sont visibles
	startingSlide: 0,
	sliderElements: {
		sliderContainer: 'slider-container', // ID du slider conteneur
		slider: 'slider', // ID du slider (ul contenant les slides sous forme de li)
		slides: '.slide', // Class des slides du slider
	},
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
}

let slideInterval; // Rend accessible globalement l'interval d'affichage du slider et permet de le clear

const jsSlider = {
	playing: sliderSetting.autoplay,
	sliderContainer: document.getElementById(sliderSetting.sliderElements.sliderContainer),
	slider: document.getElementById(sliderSetting.sliderElements.slider),
	slides: document.querySelectorAll(sliderSetting.sliderElements.slides),
	currentSlide: sliderSetting.startingSlide,
	pauseButton: {
		button: document.getElementById(sliderSetting.controlElements.pause.id),
		icone: document.getElementById(sliderSetting.controlElements.pause.iconeId)
	},
	nextButton: {
		button: document.getElementById(sliderSetting.controlElements.next.id),
		icone: document.getElementById(sliderSetting.controlElements.next.iconeId)
	},
	previousButton: {
		button: document.getElementById(sliderSetting.controlElements.previous.id),
		icone: document.getElementById(sliderSetting.controlElements.previous.iconeId)
	},
	sliderLayout(){
		// Adapte la hauteur des slides en fonction du ratio entré en setting
		this.sliderContainer.style.height = `${Math.round(this.sliderContainer.offsetWidth * sliderSetting.ratio)}px`;
	},
	pause(){
		this.pauseButton.icone.className = 'fa fa-play';
		this.playing = false;
		clearInterval(slideInterval);
	},
	play(){
		this.pauseButton.icone.className = 'fa fa-pause';
		this.playing = true;
		slideInterval = setInterval(jsSlider.nextSlide, sliderSetting.duration);
	},
	nextSlide(){
		jsSlider.goToSlide(jsSlider.currentSlide + 1);
	},
	previousSlide(){
		jsSlider.goToSlide(jsSlider.currentSlide - 1);
	},
	goToSlide(n){
		jsSlider.slides[jsSlider.currentSlide].className = 'slide';
		jsSlider.currentSlide = (n + jsSlider.slides.length)%jsSlider.slides.length;
		jsSlider.slides[jsSlider.currentSlide].className = 'slide showing';
	},
	setControls(){
		this.pauseButton.button.onclick = function(){
			if(jsSlider.playing){
				jsSlider.pause();
			} else {
				jsSlider.play();
			}
		};

		this.nextButton.button.onclick = function() {
		    jsSlider.pause();
		    jsSlider.nextSlide();
		};

		this.previousButton.button.onclick = function() {
		    jsSlider.pause();
		    jsSlider.previousSlide();
		};

		document.onkeydown = function(e) {
			if(e.which == 37){
				jsSlider.pause();
    			jsSlider.nextSlide();
			}
			else if(e.which == 39){
				jsSlider.pause();
   			 	jsSlider.previousSlide();
			}
		};
	},		
	init(){
		this.sliderLayout();
		this.setControls();
		if(sliderSetting.autoplay){
			this.play();
		} else{
			this.pause();
		}
		this.goToSlide(this.currentSlide);
	}
}



function jsSliderRun(){
	jsSlider.init();
}
