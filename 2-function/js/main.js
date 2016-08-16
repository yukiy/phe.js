/*　関数、引数、リターン　*/

function pictureHappinessOnEarth(){

	myKansu();

	var name = "yuki";

	myKansu2(name);

	name = "miraikan";

	myKansu2(name);

	var foo = myKansu3();
	console.log(foo);

	var kaettekitaText = myKansu4(name);
	console.log(kaettekitaText);

	var keisan = myKansu5(10, 30);
	console.log(keisan);

	var mojinoKeisan = myKansu5("konnichiwa ", name);
	console.log(mojinoKeisan);


	/*wiki link*/
	drawBaseMap();

}


function myKansu(){
	console.log("hello");
}

function myKansu2(aaaa){
	console.log(aaaa);
}

function myKansu3(){
	return "earth";
}

function myKansu4(text){
	var kaesuText = "hello " + text;
	return kaesuText;
}

function myKansu5(a, b){
	return a + b;
}



//----interaction------------------------------------------------------------------

function mouseClick(position){
	console.log(position);
}

function mouseDown(position){
}

function mouseMove(position){
}

function setEvents(){

	$("#exportBtn").click(function(){
		createDownloadLink();
	});
}




