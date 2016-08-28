function pictureHappinessOnEarth(){

	makeOceanColor(rgb(10,10,30));

	drawBaseMap({fillColor: rgb(50,50,80)});
	drawBorders();

	var startLngLat;
	var goalLngLat;

	var all = getAllCountriesData();

	var randomName = all[Math.floor(random(all.length))].ISO31661_name;
	var startLngLat = getLngLat(randomName);

	for(var i=0; i<all.length; i++){
		var name = all[i].ISO31661_name;
		goalLngLat = getLngLat(name);

		var lineOptions = {
			strokeWidth : "0.3px",
			strokeColor : rgb(random(255), random(255), random(255) ),
			strokeOpacity : "0.5"
		}
		drawLine([startLngLat, goalLngLat], lineOptions);				
	}		

}
 


/*----------------------------------------------------------*/

function mouseMove(positions){

}

function mouseClick(positions){

}

function mouseDown(positions){

}

