function pictureHappinessOnEarth(){

	makeOceanColor(rgb(10,10,30));

	drawBaseMap({fillColor: rgb(50,50,80)});

	var startLngLat;
	var goalLngLat;

	for(var j in pheCoords){
		startLngLat = pheCoords[j];
		console.log(startLngLat);

		for(var i=0; i<countryList.data.length; i++){
			var country = countryList.data[i];
			if(country.longitude != "" || country.longitude != undefined){
				goalLngLat = [country.longitude, country.latitude];

				var lineOptions = {
					strokeWidth : "0.3px",
					strokeColor : rgb(Math.random()*255,Math.random()*255,Math.random()*255),
					strokeOpacity : "0.5"
				}
				drawLine([startLngLat, goalLngLat], lineOptions);				
			}
		}		
	}

}
