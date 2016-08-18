function pictureHappinessOnEarth(){
	setCenter([pheCoords.kualaLumpur[0], 0]);
	makeOceanColor("#CCCCCC");
	//drawBaseMap({fillColor: "white"});

	var myNum = countryList.getDataFromName("malaysia").ISO31661_numeric;

	readData("recyclingRate.csv",function(data){

		console.log(data);
		var dataRange = getDataRange(data, "Recycle Rate");

		for(var i=0; i<data.length; i++){
			var countryCode = data[i]["ISO31661_alpha2"];
			var countryNum = countryList.getDataFromISOAlpha2(countryCode).ISO31661_numeric;

			var score = data[i]["Recycle Rate"];
			var normalizedScore = mapValue(score, dataRange.min, dataRange.max, 0.05, 1);

			if(countryNum == myNum){
				drawCountry(countryNum, {
					strokeColor: "red",
					strokeWidth: "2px",
					fillColor: rgba(0, 255, 0, normalizedScore)
				});				
			}else {
				drawCountry(countryNum, {
					strokeDasharray : "5 5",
					fillColor: rgba(0, 255, 0, normalizedScore)
				});
			}


		}
	})
}
