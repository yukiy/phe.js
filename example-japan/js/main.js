function pictureHappinessOnEarth(){
	setCenter([pheCoords.shizuoka[0], 0]);
	makeOceanColor("black");
//	drawBaseMap({fillColor: "white"});

	var jpNum = countryList.getDataFromName("japan").ISO31661_numeric;
	drawCountry(jpNum, {fillColor: "red"});
	readData("honey.csv",function(data){
		var dataRange = getDataRange(data, "DATA");

		for(var i=0; i<data.length; i++){
			var countryCode = data[i]["ISO31661_alpha2"];
			var countryNum = countryList.getDataFromISOAlpha2(countryCode).ISO31661_numeric;
			var score = data[i]["DATA"];
			var normalizedScore = mapValue(score, dataRange.min, dataRange.max, 0.05, 1);
			drawCountry(countryNum, {fillColor: rgba(255, 255, 0, normalizedScore)});

		}
	})
}
