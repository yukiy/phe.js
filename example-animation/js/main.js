function pictureHappinessOnEarth(){
	var singapore = pheCoords.singapore;
	var london = [-0.127758, 51.507351];
	var sanfran = [ -122.419416, 37.774929];
	var tokyo = pheCoords.tokyo;

	setCenter(pheCoords.perth);

	makeOceanColor("blue");
	drawGraticule({strokeWidth:"1px"});
	drawBaseMap();
	drawBorders();
	drawCountry(276);

	var option = {
		strokeWidth : "5px",
		strokeDasharray : "2 2"
	}

	drawLine([singapore, london, sanfran, tokyo],option);

	readData("happiness.csv", function(data){

		var valRange = getDataRange(data, "Happiness score");

		//---mapping each value to hue value
		for(var i=0; i<data.length; i++){
			var happinessScore = data[i]["Happiness score"];			
			var h = mapValue(happinessScore, valRange.min, valRange.max, 0, 180);
			var countryName = data[i].Country;

			try{
				countryNum = countryList.getDataFromName(countryName).ISO31661_numeric;
				drawCountry(countryNum, { 
					fillColor : hsl(h, "100%","50%"),
					filter : "blur"
				});

			}
			catch(e){
				console.log("no found name: " + countryName);
			}
		}


		var curCent = getCenter();

		var speed = 100;
		var frame = 100;
		rotateTo(curCent, singapore, frame, speed, function(){
			var curCent = getCenter();
			rotateTo(curCent, london, frame, speed, function(){
				var curCent = getCenter();
				rotateTo(curCent, tokyo, frame, speed, function(){
					var curCent = getCenter();
					rotateTo(curCent, sanfran, frame, speed, function(){
					}, false, {startNum : frame*3});
				}, false, {startNum : frame*2});
			}, false, {startNum : frame});
		}, false, {startNum : 0});

	});
}

