function pictureHappinessOnEarth(){
	setCenter([pheCoords.shizuoka[0], 0]);
	makeOceanColor("black");
	drawBaseMap({fillColor: "white"});

	var csvfilename = "energy.csv";

	var dataCell = "2001";
	var countryCell = "Country Code";

	readData(csvfilename,function(data){
		var dataRange = getDataRange(data, dataCell);

		for(var i=0; i<data.length; i++){

			var countryCode = data[i][countryCell];

			var countryNum = countryList.getDataFromISOAlpha3(countryCode).ISO31661_numeric;
			//var countryNum = countryList.getDataFromISOAlpha2(countryCode).ISO31661_numeric;
			//var countryNum = countryList.getDataFromName(countryCode).ISO31661_numeric;

			var score = data[i][dataCell];

			var normalizedScore = mapValue(score, dataRange.min, dataRange.max, 0.05, 1);

			drawCountry(countryNum, {fillColor: rgba(255, 0, 0, normalizedScore)});

		}
	})
}


/*----------------------------------------------------------*/

function mouseMove(positions){

}

function mouseClick(positions){

}

function mouseDown(positions){

}


