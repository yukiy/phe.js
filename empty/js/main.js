function pictureHappinessOnEarth(){

	var perth = [115.860457, -31.950527];

	setCenter(perth);

	makeOceanColor("grey");
	drawBaseMap();
	drawBorders();
	drawGraticule({strokeColor:"black"});

	phe.saveImage("10");
}






//----interaction------------------------------------------------------------------

function mouseClick(position){
	console.log(position);
}

function mouseDown(position){
}

function mouseMove(position){
}

