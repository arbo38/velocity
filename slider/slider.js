'use strict';

var jsSlider = {
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
	sliderLayout: function sliderLayout() {
		// Adapte la hauteur des slides en fonction du ratio entré en setting
		this.sliderContainer.style.height = Math.round(this.sliderContainer.offsetWidth * sliderSetting.ratio) + 'px';
	},
	sliderDynamicResize: function sliderDynamicResize() {
		window.addEventListener("resize", function () {
			jsSlider.sliderLayout();
		});
	},
	pause: function pause() {
		this.pauseButton.icone.className = 'fa fa-play';
		this.playing = false;
		clearInterval(slideInterval);
	},
	play: function play() {
		this.pauseButton.icone.className = 'fa fa-pause';
		this.playing = true;
		slideInterval = setInterval(jsSlider.nextSlide, sliderSetting.duration);
	},
	nextSlide: function nextSlide() {
		jsSlider.goToSlide(jsSlider.currentSlide + 1);
	},
	previousSlide: function previousSlide() {
		jsSlider.goToSlide(jsSlider.currentSlide - 1);
	},
	goToSlide: function goToSlide(n) {
		jsSlider.slides[jsSlider.currentSlide].className = 'slide';
		jsSlider.currentSlide = (n + jsSlider.slides.length) % jsSlider.slides.length;
		jsSlider.slides[jsSlider.currentSlide].className = 'slide showing';
	},
	setControls: function setControls() {
		this.pauseButton.button.onclick = function () {
			if (jsSlider.playing) {
				jsSlider.pause();
			} else {
				jsSlider.play();
			}
		};

		this.nextButton.button.onclick = function () {
			jsSlider.pause();
			jsSlider.nextSlide();
		};

		this.previousButton.button.onclick = function () {
			jsSlider.pause();
			jsSlider.previousSlide();
		};

		document.onkeydown = function (e) {
			if (e.which == 37) {
				jsSlider.pause();
				jsSlider.nextSlide();
			} else if (e.which == 39) {
				jsSlider.pause();
				jsSlider.previousSlide();
			}
		};
	},
	init: function init() {
		this.sliderLayout();
		this.setControls();
		if (sliderSetting.autoplay) {
			this.play();
		} else {
			this.pause();
		}
		this.goToSlide(this.currentSlide);
		this.sliderDynamicResize();
	}
};

