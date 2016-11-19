function run(){

	var location =  [0, 0];
	setCenter(location);

	makeOceanColor(rgb(197,247,249));

	drawBaseMap({
		fillColor: rgb(247, 237, 142),
		strokeColor: "red",
		strokeWidth: "2px",
		strokeOpacity: "1.0"
	});

	var gratiOptions = {
        strokeColor : "white",　//線の色を白に
        strokeWidth : "0.5px",　//線の太さを0.5pxに
        strokeOpacity : "0.5", //線の透明度を0.5に
        strokeDasharray : "2 2" //線が2、空白が2を繰り返す点線にする
    }

	var csvfilename = "honey.csv";
	var dataCell = "DATA";
	var countryCell = "ISO31661_numeric";

	readData(csvfilename,function(data){
		var dataRange = getDataRange(data, dataCell);

		for(var i=0; i<data.length; i++){

			var countryNum = data[i][countryCell];
     		
     		//156:china
			if(countryNum==156){
				color=rgb(219,64,22);
			}

			var score = data[i][dataCell];
			var maxValue = 80160
			var r = mapValue(score,dataRange.min,maxValue,238,255)
			var g = mapValue(score,dataRange.min,maxValue,212,100)
			var b = mapValue(score,dataRange.min,maxValue,37,46)
			color=rgb(r,g,b)

			if(score == ""){
				color = rgb(247, 237, 142);
			}
			drawCountry(countryNum, {fillColor: color});

		}

		//saveImage();
	})

}



/*----------------------------------------------------------*/

function mouseMove(positions){

}

function mouseClick(positions){

}

function mouseDown(positions){

}
