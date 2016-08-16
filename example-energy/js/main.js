function pictureHappinessOnEarth(){

	var beijing = [116.398640, 40.006053];
	var maynila = [121.045514, 14.552239];
	var kualaLumpur = [101.712162, 3.157447];
	var perth = [115.860457, -31.950527]; 
	var singapore = [103.736111, 1.332901];
	var shizuoka = [139.691706, 35.689487];
	var tokyo = [139.777194, 35.619481];

	makeOceanColor("rgb(10, 180, 255)");
	drawGraticule({strokeWidth:"1px"});
	drawBaseMap();
	drawBorders();

	var textStyleOptions = {
		strokeWidth : "0.5",
		strokeColor : "#FFF",
		fillColor : "#000",
		opacity : "1.0",
		fontsize : "30px",
		id : "title"
	}
//	drawText("Electric Energy Consumption", [-180, 0], textStyleOptions);

	readData("energy.csv", function(data){
				
		function visualize1(_year){
			var year = _year + "";
			selectById("year").text(year);

			var valRange = getDataRange(data, year);

			//---mapping each value to hue value
			for(var i=0; i<data.length; i++){
				var score = data[i][year];
				if(score == ""){
					score = 0;
				}else{
					var countryCode = data[i]["Country Code"];
					var h = mapValue(score, valRange.min, valRange.max, 0, 180);
					try{
						var countryNum = countryList.getDataFromISOAlpha3(countryCode).ISO31661_numeric;
						drawCountry(countryNum, { fillColor : hsl(h, "100%","50%")});
					}
					catch(e){
						console.log("no found code: " + countryCode);
					}	
				} 
			}			
		}

		function visualize2(_year){
			var year = _year + "";
			selectById("year").text(year);

			var valRange = getDataRange(data, year);

			//---mapping each value to hue value
			for(var i=0; i<data.length; i++){
				var score = data[i][year];
				if(score == ""){
					score = 0;
				}else{
					var val = mapValue(score, 0, 9000,   0, 255);
					var countryCode = data[i]["Country Code"];
					try{
						var countryNum = countryList.getDataFromISOAlpha3(countryCode).ISO31661_numeric;
						//drawCountry(countryNum, { fillColor : hsl(h, "100%","50%")});

						var options = {
							fillColor : rgb(255, 255-val, 255-val),
							strokeWidth: "0.5px"
						}
						drawCountry(countryNum, options);

					}
					catch(e){
						console.log("no found code: " + countryCode);
					}	
				} 
			}			
		}




		var year = 2011;
		visualize2(year);

		// setInterval(function(){
		// 	console.log(year);
		// 	visualize2(year);
		// 	year++;
		// 	if(year > 2011){
		// 		year = 1961;
		// 		drawBaseMap();
		// 	}
		// }, 5000000);

	});

}





//----interaction------------------------------------------------------------------

function mouseClick(position){
	console.log(position);
}

function mouseDown(position){
}

function mouseMove(position){
}





