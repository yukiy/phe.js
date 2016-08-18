function pictureHappinessOnEarth(){
	setCenter([pheCoords.singapore[0], 0]);
	makeOceanColor("#EEEEEE");
//	drawBaseMap({fillColor: "white"});


	var auNum = countryList.getDataFromName("singapore").ISO31661_numeric;
	drawCountry(auNum, {fillColor: "green"});


	readData("waterWithdrawal.csv",function(data){
		console.log(data);
		var dataName = "Total water withdrawal per capita (m3/inhab/year)";
		var dataRange = getDataRange(data, dataName);
		console.log(dataRange);

		for(var i=0; i<data.length; i++){
			var countryName = data[i]["Country"];
			var countryData = countryList.getDataFromName(countryName)

			if(typeof countryData == "string"){
				console.log(countryData);
			}

			var countryNum = countryData.ISO31661_numeric;

			var score = data[i][dataName];
			var normalizedScore = mapValue(score, dataRange.min, dataRange.max, 0, 1);
			drawCountry(countryNum, {
				strokeWidth : "0",
				fillColor: rgba(0, 0, 255, normalizedScore)
			});
		}
	})
}
