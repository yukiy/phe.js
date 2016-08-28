function pictureHappinessOnEarth(){

	makeOceanColor("black");
	drawBaseMap( {fillColor: "grey"} );

	var csvfilename = "energy.csv";
	var dataCell = "2001";
	var countryCell = "Country Code";

	readData(csvfilename,function(data){
		var dataRange = getDataRange(data, dataCell);

		for(var i=0; i<data.length; i++){

			var country = data[i][countryCell];
			var countryNum = getISONumber(country);

			drawCountry(countryNum, {fillColor : "white"}); //下地

			var score = data[i][dataCell];
			var option;
			if(score == ""){
				option = {
					fillColor: "grey"
				}

			}else{
				option = {
					fillColor: "red",
					fillOpacity :  mapValue(score, dataRange.min, dataRange.max, 0.05, 1)
				}
			}

			drawCountry(countryNum, option);
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


