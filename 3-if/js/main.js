/*　if文　条件分岐　*/

function pictureHappinessOnEarth(){
	var a = 20;
	var b = 20;

	/*
	*	もし(こうなら){
	*		こうする;
	*	}
	*/
	if(a < b){
		console.log("正解！");
	}


	/*
	*	もし(こうなら){
	*		こうする;
	*	}
	*   ちがったら{
	*		こうする;
	*	}
	*/
	if(a < b){
		console.log("正解！");
	}else{
		console.log("boo！");
	}


	/*
	*	もし(こうなら){
	*		こうする;
	*	}
	*	ちがって、もし(こうなら){
	*		こうする;
	*	}
	*   ちがったら{
	*		こうする;
	*	}
	*/
	if(a < b){
		console.log("bが大きい！");
	}else if(a == b){
		console.log("同じ！");
	}else{
		console.log("aが大きい！");		
	}


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




