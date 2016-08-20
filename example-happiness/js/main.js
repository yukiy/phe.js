function pictureHappinessOnEarth(){

	makeOceanColor("blue");
	drawGraticule({strokeWidth:"1px"});
	drawBaseMap();
	drawBorders();
	drawCountry(276);

	readData("happiness.csv", function(data){

		var valRange = getDataRange(data, "Happiness score");

		//---mapping each value to hue value
		for(var i=0; i<data.length; i++){
			var happinessScore = data[i]["Happiness score"];			
			var h = mapValue(happinessScore, valRange.min, valRange.max, 0, 180);
			var countryName = data[i].Country;
			var countryData;
			var countryNum;
			try{
				countryData = countryList.getDataFromName(countryName);
				console.log(countryData);
				countryNum = countryData.ISO31661_numeric;
			}
			catch(e){
				console.log("no found name: " + countryName);
			}

			drawCountry(countryNum, { fillColor : hsl(h, "100%","50%")});

		}
	});

}


/*----------------------------------------------------------*/

function mouseMove(positions){

}

function mouseClick(positions){

}

function mouseDown(positions){

}

