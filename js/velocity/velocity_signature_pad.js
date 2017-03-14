console.log("signature.js");

const signaturePadHandler = {
	resizeCanvas() {
	    // When zoomed out to less than 100%, for some very strange reason,
	    // some browsers report devicePixelRatio as less than 1
	    // and only part of the canvas is cleared then.
	    var ratio =  Math.max(window.devicePixelRatio || 1, 1);
	    canvas.width = canvas.offsetWidth * ratio;
	    canvas.height = canvas.offsetHeight * ratio;
	    canvas.getContext("2d").scale(ratio, ratio);
	},
	init(){
		var canvas = document.getElementById("signature-canvas");
		signaturePad = new SignaturePad(canvas);
	}
}

/*
function signatureScript(){

	var clearButton = $("#clear-canvas");
	var saveButton = $("#save-reservation");
	// var canvas = document.querySelector("canvas");
	var canvas = document.getElementById("signature-canvas");
	

	// Adjust canvas coordinate space taking into account pixel ratio,
	// to make it look crisp on mobile devices.
	// This also causes canvas to be cleared.
	function resizeCanvas() {
	    // When zoomed out to less than 100%, for some very strange reason,
	    // some browsers report devicePixelRatio as less than 1
	    // and only part of the canvas is cleared then.
	    var ratio =  Math.max(window.devicePixelRatio || 1, 1);
	    canvas.width = canvas.offsetWidth * ratio;
	    canvas.height = canvas.offsetHeight * ratio;
	    canvas.getContext("2d").scale(ratio, ratio);
	}

	//window.onresize = resizeCanvas;
	//resizeCanvas();

	signaturePad = new SignaturePad(canvas);

	clearButton.on("click", function (event) {
	    signaturePad.clear();
	});

	saveButton.on("click", function (event) {
	    if (signaturePad.isEmpty()) {
	    	console.log("reseigner signature");
	        alert("Merci de signer avant de valider");
	    } else {
	    	velocityController.reservations.create();
	        console.log("Saved");
	    }
	});
}
*/