/*　変数、型、Console、足し算　*/

function pictureHappinessOnEarth(){

	console.log("hello");

	var aisatsu = "konnnichiwa";
	console.log(aisatsu);

	var number = 1;
	console.log(number);

	var number2 = 30;
	console.log(number + number2);

	number++;
	console.log(number);

	number += 10;
	console.log(number);



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




