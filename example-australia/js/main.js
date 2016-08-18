function pictureHappinessOnEarth(){
	setCenter([pheCoords.perth[0], 0]);
	makeOceanColor("white");
	drawBaseMap({fillColor: "white"});
	drawGraticule({
				strokeColor: "red",
				strokeWidth: "1px",
				strokeDasharray: "3 3"
			});
	drawBorders();

	var auNum = countryList.getDataFromName("australia").ISO31661_numeric;
	drawCountry(auNum, {
		fillColor: "blue"
	});


	readData("origin_of_people_in_australia.csv",function(data){

		var dataRange = getDataRange(data, "Number of People");

		for(var i=0; i<data.length; i++){
			var countryName = data[i]["Country of Origin"];
			var countryNum = countryList.getDataFromName(countryName).ISO31661_numeric;

			var score = data[i]["Number of People"];
			var normalizedScore = mapValue(score, dataRange.min, dataRange.max, 0.2, 1);

			drawCountry(countryNum, {
				strokeColor: "red",
				strokeWidth: "1px"
			});

			drawCountry(countryNum, {
				fillColor: "blue",
				fillOpacity: normalizedScore
			});
		}
	})
}
