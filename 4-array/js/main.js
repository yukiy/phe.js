/*　配列とオブジェクトとループ　*/

function pictureHappinessOnEarth(){

	/*配列は、ひとつの変数にたくさんの数字や文字などの要素を格納できます*/
	var hairetsu = [4, 32, 78];
	console.log(hairetsu);

	console.log(hairetsu[1]);


	/*オブジェクトは、それぞれの要素に名前をつけて格納することができます*/
	var object = {name: "Miraikan", age: "15", location: "odaiba", "opening hours": "10:00-17:00"};
	console.log(object);
	console.log(object.age);
	console.log(object["opening hours"]);


	/*大量の配列やオブジェクトを扱うときは、forループを使うと便利です*/

	/*
	* 書き方： for(var i=0; i<10; i++){ }
	* 意味：変数iを0から初めて、10になるまで、ひとつずつ増やしながら、繰り返す (=10回繰り返す)。
	* これは、
	* var i = 0;
	* while(i < 10){
	*   i++;
	* }
	* とも書けます。
	* 変数の名前はなんでもよいけど、"index"の頭文字の"i"がよく使われます。
	* 
	*/

	var i = 0;
	while(i < 10){
		console.log(i);
		i++;
	}

	for(var i=0; i<10; i++){
		console.log(i);
	}

	for(var i=0; i<10; i+=2){
		console.log(i);
	}

	var arr = ["earth", "robot", "human", "space"];
	console.log(arr[2]);

	console.log(arr.length);

	for(var i=0; i<arr.length; i++){
		console.log(arr[i]);
	};


	/*
	* オブジェクトのときのインデックスの指定の仕方
	* オブジェクトは配列と違い、順番がないので、iには、キーがはいってきます。
	* そのときは、for(var i in obj){ }
	*/

	var obj = {name: "Miraikan", age: "15", location: "odaiba", "opening hours": "10:00-17:00"};
	for(var i in obj){
		console.log(i);
		console.log(obj[i]);
	}




	/*--実践--*/
	readData("energy.csv", function(data){

		/*問題1：データに入っている全てのCountry Codeをコンソールに出力する*/
		for(var i=0; i<data.length; i++){
			console.log(data[i]["Country Code"]);
		}
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

function setEvents(){

	$("#exportBtn").click(function(){
		createDownloadLink();
	});
}




