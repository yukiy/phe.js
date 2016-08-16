/*
* PHE.js
* v1.0.0
* created for Picture Happiness on Earth 2016 at Miraikan, Tokyo
*/

var datafolder = "../_data/";

var svgElId = "svgArea";
var canvasElId = "canvasArea";
var svgW = 960;
var svgH = 480;
var outputW = 4096;
var outputH = 2048;

var worldJson;
var mouseX, mouseY;

var svg;
var canvas;
var path;
var projection;

var countryList = new CountryList();

var pheBasemap;
var pheGraticule;
var pheBorders;
var pheCountries = [];
var pheLines = [];



/*----------------------------------------------------------------------------------
*-----COORDINATES--------------------------------------------------------------------
*----------------------------------------------------------------------------------
* 場所 : [経度, 緯度]
* location : [longitude, latitude]
*/
var pheCoords = {
	beijing : [116.398640, 40.006053], //China Science and Technology Museum
	maynila : [121.045514, 14.552239], //The Mind Museum
	kualaLumpur : [101.712162, 3.157447], //Petrosains
	perth : [115.860457, -31.950527], //Scitech
	singapore : [103.736111, 1.332901], //Science Centre Singapore
	shizuoka : [139.691706, 35.689487], //RuKuRu
	tokyo : [139.777194, 35.619481] //Miraikan
}



/*----------------------------------------------------------------------------------
**-----DRAW FUNCTIONS--------------------------------------------------------------------
**----------------------------------------------------------------------------------
*/

/*
https://triple-underscore.github.io/SVG11/painting.html#RenderingProperties
drawOptionsExample = {
	strokeWidth : "0.5px",
	strokeDasharray : "none" | "3 3 1 3 ",
	strokeDashoffset : 0,
	strokeLinecap : "round" | "square" | "butt",
	strokeLinejoin : "miter" | "round" | "bevel",
	strokeColor : "#000",
	strokeOpacity : "0.5",
	fillColor : "#F00",
	fillOpacity : "0.5",
	opacity : "1.0",
	id: "myId"
}

textOptionsExample = {
	fontFamily : "",
	fontStyle : "normal" | "italic" | "oblique",
	fontSize : "",
	textAnchor : "start" | "middle" | "end"
}


*/

/*---
**色見本http://www.netyasun.com/home/color.html
*/

var makeOceanColor = function(color){
	svg.append('rect')
	.attr('width', svgW)
	.attr('height', svgH)
	.attr('fill', color)
}



/*---
** 
*/
function drawBaseMap(o){

	if(!o) o = {};
	if(!o.strokeWidth) 		o.strokeWidth = "0.5px";
	if(!o.strokeColor) 		o.strokeColor = "#000";
	if(!o.strokeDasharray) 	o.strokeDasharray = "none";
	if(!o.strokeDashoffset) o.strokeDashoffset = 0;
	if(!o.strokeLinecap) 	o.strokeLinecap = "round";
	if(!o.strokeLinejoin) 	o.strokeLinejoin = "round";
	if(!o.strokeOpacity) 	o.strokeOpacity = "0.2";
	if(!o.fillColor) 		o.fillColor = "#FFF";
	if(!o.fillOpacity) 		o.fillOpacity = "1.0";

	var world = worldJson;
	var land = topojson.feature(world, world.objects.land);
	pheBasemap = svg.insert("path", ".graticule")
		.datum(land)
		.attr("class", "land")
		.attr("stroke", o.strokeColor)
		.attr("stroke-width", o.strokeWidth)
		.attr("stroke-dasharray", o.strokeDasharray)
		.attr("stroke-dashoffset", o.strokeDashoffset)
		.attr("stroke-linecap", o.strokeLinecap)
		.attr("stroke-linejoin", o.strokeLinejoin)
		.attr("stroke-opacity", o.strokeOpacity)
		.attr("fill", o.fillColor)
		.attr("fill-opacity", o.fillOpacity)
		.attr("d", path);

	return pheBasemap;
}

/*---
** 
*/
function updateBaseMap(o){
	if(o){
		if(o.strokeColor) 		pheBasemap.attr("stroke", o.strokeColor)
		if(o.strokeWidth) 		pheBasemap.attr("stroke-width", o.strokeWidth)
		if(o.strokeDasharray)	pheBasemap.attr("stroke-dasharray", o.strokeDasharray)
		if(o.strokeDashoffset)	pheBasemap.attr("stroke-dashoffset", o.strokeDashoffset)
		if(o.strokeLinecap) 	pheBasemap.attr("stroke-linecap", o.strokeLinecap)
		if(o.strokeLinejoin)	pheBasemap.attr("stroke-linejoin", o.strokeLinejoin)
		if(o.strokeOpacity)		pheBasemap.attr("stroke-opacity", o.strokeOpacity)
		if(o.fillColor) 		pheBasemap.attr("fill", o.fillColor)
		if(o.fillOpacity) 		pheBasemap.attr("fill-opacity", o.fillOpacity)		
	}
	pheBasemap.attr("d", path);

	return pheBasemap;
}



/*---
* void drawCountry(int country-code, object options)
* countryCode -> ISO 3166-1 country codes : https://en.wikipedia.org/wiki/ISO_3166-1_numeric
*/
function drawCountry(countryCode, o){

	if(!o) o = {};
	if(!o.strokeWidth) 		o.strokeWidth = "0.5px";
	if(!o.strokeColor) 		o.strokeColor = "#000";
	if(!o.strokeDasharray) 	o.strokeDasharray = "none";
	if(!o.strokeDashoffset) o.strokeDashoffset = 0;
	if(!o.strokeLinecap) 	o.strokeLinecap = "round";
	if(!o.strokeLinejoin) 	o.strokeLinejoin = "round";
	if(!o.strokeOpacity) 	o.strokeOpacity = "0.2";
	if(!o.fillColor) 		o.fillColor = "#FFF";
	if(!o.fillOpacity) 		o.fillOpacity = "1.0";

	var world = worldJson;
	var countries = world.objects.countries;
	for(var i=0; i<countries.geometries.length; i++){
		if(countries.geometries[i].id == countryCode){
			var shapeData = topojson.feature(world, world.objects.countries).features[i];

			//---draw svg
			var countrySVG = svg.insert("path", ".graticule")
				.datum(shapeData)
				.attr("class", "land")
				.attr("stroke", o.strokeColor)
				.attr("stroke-width", o.strokeWidth)
				.attr("stroke-dasharray", o.strokeDasharray)
				.attr("stroke-dashoffset", o.strokeDashoffset)
				.attr("stroke-linecap", o.strokeLinecap)
				.attr("stroke-linejoin", o.strokeLinejoin)
				.attr("stroke-opacity", o.strokeOpacity)
				.attr("fill", o.fillColor)
				.attr("fill-opacity", o.fillOpacity)
				.attr("d", path);

			pheCountries.push({svg: countrySVG, countryCode: countryCode});
		} 
	}
}

function updateCountry(countryCode){
	for(var i=0; i<pheCountries.length; i++){
		if(countryCode === pheCountries[i].countryCode){
			pheCountries[i].svg.attr("d", path);
		}
	}
}

function updateCountries(){
	for(var i=0; i<pheCountries.length; i++){
		pheCountries[i].svg.attr("d", path);
	}
}


/*---
** 
*/
function drawBorders(o){

	if(!o) o = {};
	if(!o.strokeWidth) 		o.strokeWidth = "0.5px";
	if(!o.strokeColor) 		o.strokeColor = "#000";
	if(!o.strokeDasharray) 	o.strokeDasharray = "none";
	if(!o.strokeDashoffset) o.strokeDashoffset = 0;
	if(!o.strokeLinecap) 	o.strokeLinecap = "round";
	if(!o.strokeLinejoin) 	o.strokeLinejoin = "round";
	if(!o.strokeOpacity) 	o.strokeOpacity = "0.2";

	var world = worldJson;
	var borders = topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; });
//	pheBorders = svg.append("path")
	pheBorders = svg.insert("path", ".graticule")
		.datum(borders)
		.attr("class", "land")
		.attr("stroke", o.strokeColor)
		.attr("stroke-width", o.strokeWidth)
		.attr("stroke-dasharray", o.strokeDasharray)
		.attr("stroke-dashoffset", o.strokeDashoffset)
		.attr("stroke-linecap", o.strokeLinecap)
		.attr("stroke-linejoin", o.strokeLinejoin)
		.attr("stroke-opacity", o.strokeOpacity)
		.attr("fill", "none")
		.attr("d", path);

	return pheBorders;
}


/*---
** 
*/
function updateBorders(o){
	if(o){
		if(o.strokeColor) 		pheBorders.attr("stroke", o.strokeColor);
		if(o.strokeWidth) 		pheBorders.attr("stroke-width", o.strokeWidth);
		if(o.strokeDasharray)	pheBorders.attr("stroke-dasharray", o.strokeDasharray);
		if(o.strokeDashoffset)	pheBorders.attr("stroke-dashoffset", o.strokeDashoffset);
		if(o.strokeLinecap) 	pheBorders.attr("stroke-linecap", o.strokeLinecap);
		if(o.strokeLinejoin)	pheBorders.attr("stroke-linejoin", o.strokeLinejoin);
		if(o.strokeOpacity)		pheBorders.attr("stroke-opacity", o.strokeOpacity);		
	}
	pheBorders.attr("d", path);

	return pheBorders;
}



/*---
** Graticule = 緯度経度線
** options{strokeWidth:, color;, opacity: }
*/
function drawGraticule(o){

	if(!o) o = {};
	if(!o.strokeWidth) 		o.strokeWidth = "0.5px";
	if(!o.strokeColor) 		o.strokeColor = "#777";
	if(!o.strokeDasharray) 	o.strokeDasharray = "none";
	if(!o.strokeDashoffset) o.strokeDashoffset = 0;
	if(!o.strokeLinecap) 	o.strokeLinecap = "round";
	if(!o.strokeLinejoin) 	o.strokeLinejoin = "round";
	if(!o.strokeOpacity) 	o.strokeOpacity = "0.2";

	var graticule = d3.geo.graticule();

	pheGraticule = svg.append("path")
		.datum(graticule)
		.attr("class", "graticule")
		.attr("stroke-width", o.strokeWidth)
		.attr("stroke", o.strokeColor)
		.attr("stroke-dasharray", o.strokeDasharray)
		.attr("stroke-dashoffset", o.strokeDashoffset)
		.attr("stroke-linecap", o.strokeLinecap)
		.attr("stroke-linejoin", o.strokeLinejoin)
		.attr("stroke-opacity", o.strokeOpacity)
		.attr("fill", "none")
		.attr("d", path);

	return pheGraticule;
}


/*---
** 
*/
function updateGraticule(o){
	if(o){
		if(o.strokeColor) 		pheGraticule.attr("stroke", o.strokeColor);
		if(o.strokeWidth) 		pheGraticule.attr("stroke-width", o.strokeWidth);
		if(o.strokeDasharray)	pheGraticule.attr("stroke-dasharray", o.strokeDasharray);
		if(o.strokeDashoffset)	pheGraticule.attr("stroke-dashoffset", o.strokeDashoffset);
		if(o.strokeLinecap) 	pheGraticule.attr("stroke-linecap", o.strokeLinecap);
		if(o.strokeLinejoin)	pheGraticule.attr("stroke-linejoin", o.strokeLinejoin);
		if(o.strokeOpacity)		pheGraticule.attr("stroke-opacity", o.strokeOpacity);		
	}
	pheGraticule.attr("d", path);

	return pheGraticule;
}


/*---
**
*/
function drawText(str, arrayLngLat, o){
	if(!o) o = {};
	if(!o.strokeWidth) 	o.strokeWidth = "0.5";
	if(!o.strokeColor) 	o.strokeColor = "#FFF";
	if(!o.fillColor) 	o.fillColor = "#000";
	if(!o.opacity) 		o.opacity = "1.0";
	if(!o.id)			o.id = "";


	svg.append("text")
		.attr("class", "texts")
		.attr("id", o.id)
		.attr("stroke-width", o.strokeWidth)
		.attr("stroke", o.strokeColor)
		.attr("fill", o.fillColor)
		.attr("opacity", o.opacity)
	    .attr("transform", function(d) { return "translate(" + lngLat2XY(arrayLngLat) + ")"; })
		.attr("font-size", o.fontsize)
	    .attr("dy", o.fontsize)
		.text(str);
}


function drawLine(lngLatArray, o){

	if(!o) o = {};
	if(!o.strokeWidth) 		o.strokeWidth = "2.0px";
	if(!o.strokeColor) 		o.strokeColor = "#F00";
	if(!o.strokeDasharray) 	o.strokeDasharray = "none";
	if(!o.strokeDashoffset) o.strokeDashoffset = 0;
	if(!o.strokeLinecap) 	o.strokeLinecap = "round";
	if(!o.strokeLinejoin) 	o.strokeLinejoin = "round";
	if(!o.strokeOpacity) 	o.strokeOpacity = "1.0";

	var pointData = {
		"type": "LineString", 
		"coordinates": lngLatArray
	}

	// var line = svg.selectAll(".line")
	// 	.data([pointData])
	// 	.enter()
	// 	.append("path")

	var line = svg.append("path")
		.data([pointData])
		.attr("class", "line")
		.attr("stroke-width", o.strokeWidth)
		.attr("stroke", o.strokeColor)
		.attr("stroke-dasharray", o.strokeDasharray)
		.attr("stroke-dashoffset", o.strokeDashoffset)
		.attr("stroke-linecap", o.strokeLinecap)
		.attr("stroke-linejoin", o.strokeLinejoin)
		.attr("stroke-opacity", o.strokeOpacity)
		.attr("fill", "none")
		.attr("d", path);


	pheLines.push(line);
}

function updateLines(){
	for(var i=0; i<pheLines.length; i++){
		pheLines[i].attr("d", path);
	}
}



/*----------------------------------------------------------------------------------
**-----DOM UTILITIES--------------------------------------------------------------------
**----------------------------------------------------------------------------------
*/

function selectById(elId){
	return d3.select("#"+elId);
}


/*----------------------------------------------------------------------------------
**-----GEO UTILITIES--------------------------------------------------------------------
**----------------------------------------------------------------------------------
*/


/*---
**
*/
function XY2LngLat(arrayXY){
	return projection.invert(arrayXY);
}

/*---
**
*/
function lngLat2XY(arrayLngLat){
	return projection(arrayLngLat);
}

/*---
**
*/
function invertCoord(arrayLngLat){
	return [ -arrayLngLat[0], -arrayLngLat[1] ];
}



function setCenter(arrayLngLat){
	projection.rotate(invertCoord(arrayLngLat));
}


function updateCenter(arrayLngLat){
	projection.rotate(invertCoord(arrayLngLat));
	updateBaseMap();
	updateBorders();
	updateGraticule();
	updateCountries();
	updateLines();
}




/*----------------------------------------------------------------------------------
**-----DATA UTILITIES--------------------------------------------------------------------
**----------------------------------------------------------------------------------
*/

/*---
**
*/
var rgb = function(r, g, b){
	r = Math.round(r);
	g = Math.round(g);
	b = Math.round(b);
	return "rgb("+r+","+g+","+b+")"
}

var rgba = function(r, g, b, a){
	r = Math.round(r);
	g = Math.round(g);
	b = Math.round(b);
	return "rgba("+r+","+g+","+b+","+a+")"
}

var hsl = function(h, s, l){
	return "hsl("+h+","+s+","+l+")"
}



/*---
**
*/
var mapValue = function(val1, min1, max1, min2, max2){
	var a = (val1 - min1) / (max1 - min1);
	var val2 = (max2 - min2) * a + min2;
	return val2;
}


/*---
**
*/
var readData = function(filename, callback){
	d3.csv(datafolder + filename, function(data){
		callback(data);
	});
}


/*---
**
*/
var getDataRange = function(data, dataName){

	var minVal = d3.min(data, function(e){
		if(e[dataName] == "") return undefined;
		e[dataName] = parseFloat(e[dataName]);
		return e[dataName];
	});
	var maxVal = d3.max(data, function(e){
		if(e[dataName] == "") return undefined;
		e[dataName] = parseFloat(e[dataName]);
		return e[dataName];
	});

	return {min: minVal, max: maxVal};
}


/*---
**
*/
function mergeData(){

	var  addValueFromAnotherList = function(){
		//---in this case add .capital from list1 to list2;
		var list1 = countryList.data.list;
		var list2 = countryList.data2.list;
		var list3 = {list:[]}

		for(var i=0; i<list2.length; i++){

			var num = list2[i].ISO31661_numeric;
			for(var j=0; j<list1.length; j++){

				if( num == list1[j].ISO31661_numeric){
					var capital = list1[j].capital;
					list2[i].capital = capital;
				}
			}
		}	
		return list2;
	}


	var json2csv = function(json) {
	    var header = Object.keys(json[0]).join(',') + "\n";

	    var body = json.map(function(d){
	        return Object.keys(d).map(function(key) {
	            return d[key];
	        }).join(',');
	    }).join("\n");

	    return header + body;
	}


	var json = addValueFromAnotherList();
	var str = json2csv(json);
	d3.select('body').append('<pre>'+str+'</pre>');
}





/*----------------------------------------------------------------------------------
**-----INITIAL SET UP--------------------------------------------------------------------
**----------------------------------------------------------------------------------
*/

var PHE = function(){
}

var phe = new PHE();

PHE.prototype.run = function(){

	this.createSVGArea();
	this.createCanvasArea();
	this.setInteractions();

	this.createExportBtns();


	projection = d3.geo.equirectangular()
	.scale(153)
	.translate([svgW / 2, svgH / 2])
	.precision(.1);

	path = d3.geo.path().projection(projection);

	d3.json(datafolder+"world-110m.json", function(error, world) {
		if (error) throw error;
		worldJson = world;
		countryList.loadList("countries.csv",function(){
			pictureHappinessOnEarth();
		});
	})

	//---What's this? -> http://stackoverflow.com/questions/22448032/d3-what-is-the-self-as-in-d3-selectself-frameelement-styleheight-height
	d3.select(self.frameElement).style("height", svgH + "px");

}


PHE.prototype.createSVGArea = function(){
	svg = d3.select("#"+svgElId).append("svg")
		.attr("id", "svg")
		.attr("width", svgW)
		.attr("height", svgH);
}


PHE.prototype.createCanvasArea = function (){
	canvas = d3.select("#"+canvasElId).append("canvas")
		.attr("id", "canvas")
		.attr("width", outputW )
		.attr("height", outputH);
}


PHE.prototype.setInteractions = function(){

	var area = d3.select("svg");

	area.on("mousemove", function(){
		var XY = d3.mouse(this);
		var lngLat = XY2LngLat(XY);
		mouseX = XY[0];
		mouseY = XY[1];
		mouseMove({x:XY[0], y:XY[1], lng:lngLat[0], lat:lngLat[1]});
	});

	area.on("mousedown.log", function() {
		var XY = d3.mouse(this);
		var lngLat = XY2LngLat(XY);
		mouseDown({x:XY[0], y:XY[1], lng:lngLat[0], lat:lngLat[1]});
	});

	area.on("click", function() {
		var XY = d3.mouse(this);
		var lngLat = XY2LngLat(XY);
		mouseClick({x:XY[0], y:XY[1], lng:lngLat[0], lat:lngLat[1]});
	});

}


PHE.prototype.createExportBtns = function(){
	var that = this;

	//---PNG
	d3.select("#footer").append("input")
	.attr("id", "png_btn")
	.attr("type", "button")
	.attr("value", "Export as PNG")
    .on("click", function(d) {
    	that.saveImage();
    })

	//---SVG
	d3.select("#footer").append("input")
	.attr("id", "svg_btn")
	.attr("type", "button")
	.attr("value", "Export as SVG")
    .on("click", function(d) {
    	that.createSVGDownload();
    })

}


PHE.prototype.createSVGDownload = function(){
	var html = d3.select("svg")
//        .attr("title", "test2")
        .attr("version", 1.1)
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .node().parentNode.innerHTML;

    window.open("data:image/svg+xml;base64,"+ btoa(html));
	// d3.select("body")
	// .append("div")
	// .attr("id", "svg-download")
	// .html("Right-click on this preview and choose Save as<br/>")
	// .append("img")
	// .attr("src", "data:image/svg+xml;base64,"+ btoa(html));
}


PHE.prototype.getImageDownloadLinkTag = function(linkText){
	if(!linkText) linkText = "Download Image";
	//---get SVG as text
	var svgText = document.getElementById(svgElId).innerHTML;
	//---draw canvas from SVG with canvg()
	canvg("canvas", svgText, {ignoreDimensions: true, scaleWidth: outputW, scaleHeight: outputH});

	var linkTag = "<a id='link' href='" 
			+ document.getElementById("canvas").toDataURL() 
			+ "' download='export.png'>"+linkText+"</a>"

	return linkTag;
}


PHE.prototype.saveImage = function(filename){
	if(!filename) filename = Date.now();
	//---get SVG as text
	var svgText = document.getElementById(svgElId).innerHTML;
	//---draw canvas from SVG with canvg()
	canvg("canvas", svgText, {ignoreDimensions: true, scaleWidth: outputW, scaleHeight: outputH});
	//---make canvas blob
	var canvas = document.getElementById("canvas");
	canvas.toBlob(function(blob) {
    	saveAs(blob, filename+".png");
	}, "image/png");
}


$(function(){
	phe.run();
})

