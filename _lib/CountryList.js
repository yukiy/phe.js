var CountryList = function(){
	this.data;
};

CountryList.prototype.loadList = function(filename, callback){
	d3.csv(datafolder+filename, function(data){
		countryList.data = data;
		callback();
	});
}

CountryList.prototype.getDataFromISONumeric = function(num){
	for(var i = 0; i<this.data.length; i++){
		if(num == this.data[i].ISO31661_numeric){
			return this.data[i];
		}
	}
}

CountryList.prototype.getDataFromISOAlpha2 = function(_str){
	var str = _str.toLowerCase();
	for(var i = 0; i<this.data.length; i++){
		if(str == this.data[i].ISO31661_alpha2.toLowerCase()){
			return this.data[i];
		}
	}
}

CountryList.prototype.getDataFromISOAlpha3 = function(_str){
	var str = _str.toLowerCase();

	for(var i = 0; i<this.data.length; i++){
		if(str == this.data[i].ISO31661_alpha3.toLowerCase()){
			return this.data[i];
		}
	}
}


CountryList.prototype.getDataFromName = function(_str){
	var str = _str.toLowerCase();
	var list = this.data;

	//--- check ISO31661_name first
	for(var i = 0; i<this.data.length; i++){
		if(str == this.data[i].ISO31661_name.toLowerCase()){
			return this.data[i];
		}
	}

	//--- if no match, how's formal_name?
	for(var i = 0; i<this.data.length; i++){
		if(str == this.data[i].formal_name.toLowerCase()){
			return this.data[i];
		}
	}

	//--- if still no, check useradded_name
	for(var i = 0; i<this.data.length; i++){
		if(this.data[i].useradded_name1 && str == this.data[i].useradded_name1.toLowerCase()){
			return this.data[i];
		}
	}
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
}


