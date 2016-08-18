/*
* CountryList.js
* v1.0.0
* created for Picture Happiness on Earth 2016 at Miraikan, Tokyo
*/

var CountryList = function(){
	this.data;
	this.latlon;
};

CountryList.prototype.loadList = function(filename, callback){
	d3.csv(datafolder+filename, function(data){
		countryList.data = data;
		callback();
	});
}

CountryList.prototype.loadLatlon = function(filename, callback){
	d3.csv(datafolder+filename, function(data){
		countryList.latlon = data;
		callback();
	});
}

CountryList.prototype.getDataFromISONumeric = function(num){
	for(var i = 0; i<this.data.length; i++){
		if(num == this.data[i].ISO31661_numeric){
			return this.data[i];
		}
	}

	return "no data found: " + _str;
}

CountryList.prototype.getDataFromISOAlpha2 = function(_str){
	var str = _str.toLowerCase();
	for(var i = 0; i<this.data.length; i++){
		if(str == this.data[i].ISO31661_alpha2.toLowerCase()){
			return this.data[i];
		}
	}

	return "no data found: " + _str;
}

CountryList.prototype.getDataFromISOAlpha3 = function(_str){
	var str = _str.toLowerCase();

	for(var i = 0; i<this.data.length; i++){
		if(str == this.data[i].ISO31661_alpha3.toLowerCase()){
			return this.data[i];
		}
	}

	return "no data found: " + _str;
}


CountryList.prototype.getDataFromName = function(_str){
	//---remove SPACE, ")", "(", "," from _str
	var str = _str.toLowerCase().replace(/(\s+)|\(|\)|\,/g, "");
	var list = this.data;

	for(var i = 0; i<this.data.length; i++){
	//--- check ISO31661_name first
		if(str == this.data[i].ISO31661_name.toLowerCase().replace(/(\s+)|\(|\)|\,/g, "")){
			return this.data[i];
		}

	//--- if no match, how's formal_name?
		if(str == this.data[i].formal_name.toLowerCase().replace(/(\s+)|\(|\)|\,/g, "")){
			return this.data[i];
		}

	//--- if still no, check useradded_name
		if(str == this.data[i].useradded_name1.toLowerCase().replace(/(\s+)|\(|\)|\,/g, "")){
			return this.data[i];
		}

		if(str == this.data[i].useradded_name2.toLowerCase().replace(/(\s+)|\(|\)|\,/g, "")){
			return this.data[i];
		}

	}



	// //--- check ISO31661_name first
	// for(var i = 0; i<this.data.length; i++){
	// 	if(str == this.data[i].ISO31661_name.toLowerCase().trim()){
	// 		return this.data[i];
	// 	}
	// }

	// //--- if no match, how's formal_name?
	// for(var i = 0; i<this.data.length; i++){
	// 	if(str == this.data[i].formal_name.toLowerCase().trim()){
	// 		return this.data[i];
	// 	}
	// }

	// //--- if still no, check useradded_name
	// for(var i = 0; i<this.data.length; i++){
	// 	if(str == this.data[i].useradded_name1.toLowerCase().trim()){
	// 		return this.data[i];
	// 	}
	// }

	return "no data found: " + _str;
}


CountryList.prototype.getDataFromFormalName = function(str){
	for(var i = 0; i<this.data.length; i++){
		if(str == this.data[i].formalName){
			return this.data[i];
		}
	}

	//--- in case if there is a no formal name (means name = formal name)
	for(var i = 0; i<this.data.length; i++){
		if(str == this.data[i].ISO31661_name){
			return this.data[i];
		}
	}

	return "no data found: " + _str;
}


