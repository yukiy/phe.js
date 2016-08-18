function pictureHappinessOnEarth(){
	setCenter([pheCoords.maynila[0], 0]);
	makeOceanColor("white");
	drawBaseMap({
		fillColor: "white",
		strokeWidth: "2px"
	});
	drawBorders({strokeWidth: "2px"});

	var auNum = countryList.getDataFromName("philippine").ISO31661_numeric;
	drawCountry(auNum, {fillColor: "green"});


setFillImage("image", "images.jpg")

	readData("endangeredLanguages.csv?1",function(data){
		console.log(data);
		var dataName = "Value";
		var dataRange = getDataRange(data, dataName);

		for(var i=0; i<data.length; i++){
			var countryCode = data[i]["CountryCode"];
			var countryData = countryList.getDataFromISOAlpha2(countryCode)

			if(typeof countryData == "string"){
				console.log(countryData);
			}

			var countryNum = countryData.ISO31661_numeric;

			var score = data[i][dataName];

			var normalizedScore = mapValue(score, dataRange.min, dataRange.max, 0, 1);
			drawCountry(countryNum, {
				strokeWidth : "0",
				fillColor: "purple",
				fillOpacity: normalizedScore
			});

			var countryCoords = [countryData.longitude, countryData.latitude];
			drawText(score, countryCoords, {
				fontSize : "10px",
				strokeWidth : "0px",
				fillColor : "red"
			});



		}
	})
}
