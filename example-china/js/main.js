function pictureHappinessOnEarth(){
	setCenter([pheCoords.beijing[0], 0]);
	makeOceanColor("orange");
	drawBaseMap({
		strokeColor: "red",
		strokeWidth: "3px",
		strokeDasharray : "10 10",
		fillColor: "orange"
	});
	drawBorders({
		strokeColor: "red",
		strokeWidth: "3px",
		strokeDasharray : "10 10",
		fillColor: "orange"
	});

	var chNum = countryList.getDataFromName("china").ISO31661_numeric;

	readData("GHGemission.csv",function(data){
		console.log(data);

		var dataRange = getDataRange(data, "2012", 1);

		for(var i=0; i<data.length; i++){
			var countryName = data[i]["Country"];
			var countryNum = countryList.getDataFromName(countryName).ISO31661_numeric;

			var score = data[i]["2012"];
			var normalizedScore = mapValue(score, dataRange.min, dataRange.max, 0, 1);
		
			drawCountry(countryNum, {
				strokeWidth: "0",
				fillColor: rgba(40, 40, 40, normalizedScore)
			});
		}
	})
}
