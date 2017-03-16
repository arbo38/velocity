"use strict";

var signaturePadHandler = {
	canvas: "",
	resizeCanvas: function resizeCanvas() {
		// When zoomed out to less than 100%, for some very strange reason,
		// some browsers report devicePixelRatio as less than 1
		// and only part of the canvas is cleared then.
		var ratio = Math.max(window.devicePixelRatio || 1, 1);
		this.canvas.width = canvas.offsetWidth * ratio;
		this.canvas.height = canvas.offsetHeight * ratio;
		this.canvas.getContext("2d").scale(ratio, ratio);
	},
	init: function init() {
		var canvas = document.querySelector("canvas");
		this.canvas = canvas;
		signaturePad = new SignaturePad(canvas);
	}
};