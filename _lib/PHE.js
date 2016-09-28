/*
* PHE.js
* v1.1.0
* created for Picture Happiness on Earth 2016 at Miraikan, Tokyo
*/

var PHE = function(){
	this.scriptFiles = [
		"../_lib/codemirror/codemirror.js",
		"../_lib/codemirror/javascript.js",
		"../_lib/canvg/rgbcolor.js",
		"../_lib/canvg/StackBlur.js",
		"../_lib/canvg/canvg.js",
		"../_lib/FileSaver.min.js",
		"../_lib/canvas-toBlob.js",
		"../_lib/d3.v3.min.js",
		"../_lib/topojson.v1.min.js",
		"../_lib/CountryList.js"
	];

	this.styleFiles = [
		"../_lib/codemirror/codemirror.css"
	];

	this.basemap = null;
	this.graticule = null;
	this.borders = null;
	this.countries = [];
	this.lines = [];
	this.center = [0, 0];

	this.datafolder = "../_data/";

	this.editor = true;
}

var phe = new PHE();

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

var countryList;





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

function makeOceanColor(color){
	return phe.makeOceanColor(color);
}

function drawBaseMap(o){
	return phe.drawBaseMap(o);
}

function updateBaseMap(o){
	return phe.updateBaseMap(o);
}

function drawCountry(countryCode, o){
	return phe.drawCountry(countryCode, o);
}

function updateCountry(countryCode){
	return phe.updateCountry(countryCode);
}

function updateCountries(){
	return phe.updateCountries();
}

function drawBorders(o){
	return phe.drawBorders(o);
}

function updateBorders(o){
	return phe.updateBorders(o);
}

function drawGraticule(o){
	return phe.drawGraticule(o);
}

function updateGraticule(o){
	return phe.updateGraticule(o);
}

function drawText(str, lngLat, o){
	return phe.drawText(str, lngLat, o);
}

function drawLine(lngLatArray, o){
	return phe.drawLine(lngLatArray, o);
}

function updateLines(){
	return phe.updateLines();
}

/*----------------------------------------------------------------------------------
**-----GEO UTILITIES--------------------------------------------------------------------
**----------------------------------------------------------------------------------
*/


function XY2LngLat(arrayXY){
	return phe.XY2LngLat(arrayXY);
}

function lngLat2XY(lngLat){
	return phe.lngLat2XY(lngLat);
}

function invertCoord(lngLat){
	return phe.invertCoord(lngLat);
}

function setCenter(lngLat){
	return phe.setCenter(lngLat);
}

function getCenter(){
	return phe.getCenter();
}

function updateCenter(lngLat){
	return phe.updateCenter(lngLat);
}


function rotateMap(yaw, pitch){
	return phe.rotateMap(yaw, pitch);
}


function rotateTo(startLngLat, distLngLat, frame, speed, callback, isExport, exportOptions){
	return phe.rotateTo(startLngLat, distLngLat, frame, speed, callback, isExport, exportOptions);
}


/*----------------------------------------------------------------------------------
**-----DATA UTILITIES--------------------------------------------------------------------
**----------------------------------------------------------------------------------
*/

function rgb(r, g, b){
	return phe.rgb(r, g, b);
}

function rgba(r, g, b, a){
	return phe.rgba(r, g, b, a);
}

function hsl(h, s, l){
	return phe.hsl(h, s, l);
}

function mapValue(val1, min1, max1, min2, max2){
	return phe.mapValue(val1, min1, max1, min2, max2);
}

function readData(filename, callback){
	return phe.readData(filename, callback);
}

function getDataRange(data, dataName, arrayStart){
	return phe.getDataRange(data, dataName, arrayStart);
}

function random(min, max){
	return phe.random(min, max);
}

//THIS IS NOT LATEST
function mergeData(filename1, filename2, commonkey1, commonkey2, newkeyArray){
	return phe.mergeData(filename1, filename2, commonkey1, commonkey2, newkeyArray)
}


/*----------------------------------------------------------------------------------
**-----DOM UTILITIES--------------------------------------------------------------------
**----------------------------------------------------------------------------------
*/

function selectById(elId){
	return phe.selectById(elId);
}




/*----------------------------------------------------------------------------------
**-----SVG FILTERS (EXPERIMENTAL)--------------------------------------------------------------------
**----------------------------------------------------------------------------------
*/
function addFilter(){
	return phe.addFilter();
}

function setFillImage(id, filename, width, height){
	return phe.setFillImage(id, filename, width, height)
}


/*----------------------------------------------------------------------------------
**-----FILE UTILITIES--------------------------------------------------------------------
**----------------------------------------------------------------------------------
*/
function saveImage(filename){
	return phe.saveImage(filename);
}



/*----------------------------------------------------------------------------------
**-----CountryList wrappers--------------------------------------------------------------------
**----------------------------------------------------------------------------------
*/

var getAllCountriesData = function(){
	return countryList.data;
}

var getCountryData = function(country){
	return countryList.getData(country);
}

var getLngLat = function(country){
	return countryList.getLngLat(country);
}

var getISOName = function(country){
	return countryList.getISOName(country);
}

var getISONumber = function(country){
	return countryList.getISONumber(country);
}

var getCapital = function(country){
	return countryList.getCapital(country);
}


/*----------------------------------------------------------------------------------
**-----INITIAL SET UP--------------------------------------------------------------------
**----------------------------------------------------------------------------------
*/

// var mouseMove = function(){};
// var mouseDown = function(){};
// var mouseClick = function(){};

PHE.prototype.run = function(){
	var that = this;

	document.body.innerHTML += "<div id='main'></div>";

	var el = document.getElementById("main");
	el.innerHTML += "<div id='svgArea'></div>";
	el.innerHTML += "<div id='canvasArea'></div>";
	if(this.editor){
		el.innerHTML += "<div id='editor'></div>";
	}
	document.body.innerHTML += "<div id='footer'></div>";

	countryList = new CountryList();

	this.createSVGArea();
	this.createCanvasArea();
	this.setInteractions();

	projection = d3.geo.equirectangular()
	.scale(153)
	.translate([svgW / 2, svgH / 2])
	.precision(.1);

	path = d3.geo.path().projection(projection);

	d3.json(this.datafolder+"./phe/world-110m.json", function(error, world) {
//	d3.json(this.datafolder+"./phe/world-50m.json", function(error, world) {
		if (error) throw error;
		worldJson = world;
		countryList.loadList("./phe/countries.csv?"+new Date(),function(){
			countryList.loadList("./phe/countries.csv?"+new Date(),function(){
				if(typeof pictureHappinessOnEarth == "function" && !that.editor){
					pictureHappinessOnEarth();
				}
			});
		});
	})


	addFilter();//experimental

	//---What's this? -> http://stackoverflow.com/questions/22448032/d3-what-is-the-self-as-in-d3-selectself-frameelement-styleheight-height
	d3.select(self.frameElement).style("height", svgH + "px");


	if(this.editor){
		this.createJSEditor();
	}

	this.createExportBtns();

	this.setStyles();

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

	d3.select("#footer").append("span")
	.attr("id", "export");

	//---PNG
	d3.select("#export").append("input")
	.attr("id", "png_btn")
	.attr("type", "button")
	.attr("value", "Export as PNG")
    .on("click", function(d) {
    	that.saveImage();
    })

	//---SVG
	d3.select("#export").append("input")
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


PHE.prototype.createJSEditor = function(){
	if(!CodeMirror) return; 

	var el = document.getElementById("editor");
	el.innerHTML += "<textarea id='editor_js' rows=30 cols=50></textarea>";
	// el = document.getElementById("footer");
	// el.innerHTML += "<input id='runBtn' type='button' value='run'/>";

	var jsEditor = CodeMirror.fromTextArea(document.getElementById('editor_js'), {
		mode: "javascript",
		lineNumbers: true,
		indentUnit: 4
	});

	d3.select("#footer").append("input")
	.attr("id", "run_btn")
	.attr("type", "button")
	.attr("value", "Run")
	.on("click", function(d){
		jsEditor.save();
		var val = $('#editor_js').val();
		eval(val);
	});

}

PHE.prototype.setStyles = function(){

	$("body").css({
		position : "relative",
		textAlign : "center"
	})

	$("#svg").css({
		border : "dashed #aaa 1px"
	});

	$("#footer").css({
		zIndex : 100,
		background : "#0068B6",
		position : "fixed",
		bottom : "0px",
		width : "100%",
		height : "30px"
	});

	$("#footer input").css({
		marginRight : "40px"
	});

	$("#editor").css({
		border : "solid #aaa 1px",
		textAlign : "left",
		width : svgW,
		margin : "auto",
		marginBottom : "35px"
	});
}


/*-------------------------------------------------------------------------------------------------
**----DRAW FUNCTIONS-------------------------------------------------------------------------------
**-------------------------------------------------------------------------------------------------
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

PHE.prototype.makeOceanColor = function(color){
	svg.append('rect')
	.attr('width', svgW)
	.attr('height', svgH)
	.attr('fill', color);
}


PHE.prototype.drawBaseMap = function(o){
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
	this.basemap = svg.insert("path", ".graticule")
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

	return this.basemap;
}


PHE.prototype.updateBaseMap = function(o){
	if(o){
		if(o.strokeColor) 		this.basemap.attr("stroke", o.strokeColor)
		if(o.strokeWidth) 		this.basemap.attr("stroke-width", o.strokeWidth)
		if(o.strokeDasharray)	this.basemap.attr("stroke-dasharray", o.strokeDasharray)
		if(o.strokeDashoffset)	this.basemap.attr("stroke-dashoffset", o.strokeDashoffset)
		if(o.strokeLinecap) 	this.basemap.attr("stroke-linecap", o.strokeLinecap)
		if(o.strokeLinejoin)	this.basemap.attr("stroke-linejoin", o.strokeLinejoin)
		if(o.strokeOpacity)		this.basemap.attr("stroke-opacity", o.strokeOpacity)
		if(o.fillColor) 		this.basemap.attr("fill", o.fillColor)
		if(o.fillOpacity) 		this.basemap.attr("fill-opacity", o.fillOpacity)
	}
	this.basemap.attr("d", path);

	return this.basemap;
}


/*---
* void drawCountry(int country-code, object options)
* countryCode -> ISO 3166-1 country codes : https://en.wikipedia.org/wiki/ISO_3166-1_numeric
*/
PHE.prototype.drawCountry = function(countryCode, o){

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

	if(!o.filter){
		o.filter = "";
	} else{
		o.filter = "url(#"+o.filter+")";
	}

	if(o.fillImageId){
		o.fillColor = "url(#"+o.fillImageId+")";
	}

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
				.attr("filter", o.filter)
//				.attr("fill", o.fillImageId)
				.attr("d", path);



			this.countries.push({svg: countrySVG, countryCode: countryCode});
		}
	}
}

PHE.prototype.updateCountry = function(countryCode){
	for(var i=0; i<this.countries.length; i++){
		if(countryCode === this.countries[i].countryCode){
			this.countries[i].svg.attr("d", path);
		}
	}
}

PHE.prototype.updateCountries = function(){
	for(var i=0; i<this.countries.length; i++){
		this.countries[i].svg.attr("d", path);
	}
}


/*---
**
*/
PHE.prototype.drawBorders = function(o){

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
//	this.borders = svg.append("path")
	this.borders = svg.insert("path", ".graticule")
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

	return this.borders;
}


/*---
**
*/
PHE.prototype.updateBorders = function(o){
	if(this.borders){
		if(o){
			if(o.strokeColor) 		this.borders.attr("stroke", o.strokeColor);
			if(o.strokeWidth) 		this.borders.attr("stroke-width", o.strokeWidth);
			if(o.strokeDasharray)	this.borders.attr("stroke-dasharray", o.strokeDasharray);
			if(o.strokeDashoffset)	this.borders.attr("stroke-dashoffset", o.strokeDashoffset);
			if(o.strokeLinecap) 	this.borders.attr("stroke-linecap", o.strokeLinecap);
			if(o.strokeLinejoin)	this.borders.attr("stroke-linejoin", o.strokeLinejoin);
			if(o.strokeOpacity)		this.borders.attr("stroke-opacity", o.strokeOpacity);
		}
		this.borders.attr("d", path);

		return this.borders;
	}
}


/*---
* Graticule = 緯度経度線
* options{strokeWidth:, color;, opacity: }
*/
PHE.prototype.drawGraticule = function(o){
	if(!o) o = {};
	if(!o.strokeWidth) 		o.strokeWidth = "0.5px";
	if(!o.strokeColor) 		o.strokeColor = "#777";
	if(!o.strokeDasharray) 	o.strokeDasharray = "none";
	if(!o.strokeDashoffset) o.strokeDashoffset = 0;
	if(!o.strokeLinecap) 	o.strokeLinecap = "round";
	if(!o.strokeLinejoin) 	o.strokeLinejoin = "round";
	if(!o.strokeOpacity) 	o.strokeOpacity = "0.2";

	var graticule = d3.geo.graticule();

	this.graticule = svg.append("path")
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

	return this.graticule;
}


/*---
**
*/
PHE.prototype.updateGraticule = function(o){
	if(this.graticule){
		if(o){
			if(o.strokeColor) 		this.graticule.attr("stroke", o.strokeColor);
			if(o.strokeWidth) 		this.graticule.attr("stroke-width", o.strokeWidth);
			if(o.strokeDasharray)	this.graticule.attr("stroke-dasharray", o.strokeDasharray);
			if(o.strokeDashoffset)	this.graticule.attr("stroke-dashoffset", o.strokeDashoffset);
			if(o.strokeLinecap) 	this.graticule.attr("stroke-linecap", o.strokeLinecap);
			if(o.strokeLinejoin)	this.graticule.attr("stroke-linejoin", o.strokeLinejoin);
			if(o.strokeOpacity)		this.graticule.attr("stroke-opacity", o.strokeOpacity);
		}
		this.graticule.attr("d", path);

		return this.graticule;
	}
}


/*---
**
*/
PHE.prototype.drawText = function(str, lngLat, o){
	if(!o) o = {};
	if(!o.fontSize) 	o.fontSize = "10px";
	if(!o.strokeWidth) 	o.strokeWidth = "0.5";
	if(!o.strokeColor) 	o.strokeColor = "#FFF";
	if(!o.fillColor) 	o.fillColor = "#000";
	if(!o.opacity) 		o.opacity = "1.0";
	if(!o.id)			o.id = "";


	var position = lngLat2XY(lngLat);
	var x = position[0];
	var y = position[1] + (parseInt(o.fontSize)/2);

	svg.append("text")
		.attr("class", "texts")
		.attr("id", o.id)
		.attr("stroke-width", o.strokeWidth)
		.attr("stroke", o.strokeColor)
		.attr("fill", o.fillColor)
		.attr("opacity", o.opacity)
	    .attr("transform", function(d) { return "translate(" + [x,y] + ")"; })
		.attr("font-size", o.fontSize)
		.attr("text-anchor", "middle")
		.text(str);

}


/*---
**
*/
PHE.prototype.drawLine = function(lngLatArray, o){

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
//		.datum(pointData)
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

	this.lines.push(line);
}

PHE.prototype.updateLines = function(){
	for(var i=0; i<this.lines.length; i++){
		this.lines[i].attr("d", path);
	}
}


/*-------------------------------------------------------------------------------------------------
**----GEO UTILITIES--------------------------------------------------------------------------------
**-------------------------------------------------------------------------------------------------
*/


PHE.prototype.XY2LngLat = function(arrayXY){
	return projection.invert(arrayXY);
}


PHE.prototype.lngLat2XY = function(lngLat){
	return projection(lngLat);
}

PHE.prototype.invertCoord = function(lngLat){
	return [ -lngLat[0], -lngLat[1] ];
}


PHE.prototype.setCenter = function(lngLat){
	this.center = lngLat;
	projection.rotate(invertCoord(lngLat));
}

PHE.prototype.getCenter = function(){
	return 	this.center;
}

PHE.prototype.updateCenter = function(lngLat){
	this.center = lngLat;
	projection.rotate(invertCoord(lngLat));
	updateBaseMap();
	updateBorders();
	updateGraticule();
	updateCountries();
	updateLines();
}


PHE.prototype.rotateMap = function(yaw, pitch){

	// if(!yaw) yaw = 0;
	// if(!pitch) pitch = 0;
	// if(!roll) roll = 0;
	var curCenter = getCenter();
	updateCenter([curCenter[0]+yaw, curCenter[1]+pitch]);
	updateBaseMap();
	updateBorders();
	updateGraticule();
	updateCountries();
	updateLines();
}


PHE.prototype.rotateTo = function(startLngLat, distLngLat, frame, speed, callback, isExport, exportOptions){

	var num = 0;

	var lngUnit = ( distLngLat[0] - startLngLat[0] ) / frame;
	var latUnit = ( distLngLat[1] - startLngLat[1] ) / frame;

	var o = {};
	if (exportOptions) o = exportOptions;
	if(!o.prefix) o.prefix = "";
	if(!o.startNum) o.startNum = 0;

	function move(num){
		if(num < frame){

			rotateMap(lngUnit, latUnit);

			if(isExport){
				var fileNum = o.startNum + num;
				phe.saveImage(o.prefix+fileNum);
			}

			setTimeout(function(){
				num++;
				move(num);
			}, speed);

		}else{

			callback();

		}
	}

	move(num);
}



/*---------------------------------------------------------------------------------------
**-----DATA UTILITIES--------------------------------------------------------------------
**----------------------------------------------------------------------------------
*/

/*---
**
*/
PHE.prototype.rgb = function(r, g, b){
	r = Math.round(r);
	g = Math.round(g);
	b = Math.round(b);
	return "rgb("+r+","+g+","+b+")"
}

PHE.prototype.rgba = function(r, g, b, a){
	r = Math.round(r);
	g = Math.round(g);
	b = Math.round(b);
	return "rgba("+r+","+g+","+b+","+a+")"
}

PHE.prototype.hsl = function(h, s, l){
	return "hsl("+h+","+s+","+l+")"
}



/*---
**
*/
PHE.prototype.mapValue = function(val1, min1, max1, min2, max2){
	var a = (val1 - min1) / (max1 - min1);
	var val2 = (max2 - min2) * a + min2;
	return val2;
}


/*---
**
*/
PHE.prototype.readData = function(filename, callback){
	d3.csv(this.datafolder + filename, function(data){
		callback(data);
	});
}


/*---
**
*/
PHE.prototype.getDataRange = function(data, dataName, arrayStart){

	if(arrayStart > 0){
		for(var i=0; i<arrayStart; i++){
			data.shift()
		}
	}

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
PHE.prototype.random = function(min, max){
	if(max){
		return Math.random()*(max-min)+min;		
	}

	return Math.random()*min;		
}



/*---
**UTILITY THIS IS NOT LATEST
*/
PHE.prototype.mergeData = function(filename1, filename2, commonkey1, commonkey2, newkeyArray){

	var  addValueFromAnotherList = function(data1, data2, commonkey1, commonkey2, newkeyArray){

		for(var i=0; i<data1.length; i++){
			for(var j=0; j<data2.length; j++){
				if( data1[i][commonkey1].toLowerCase() == data2[j][commonkey2].toLowerCase()){
					for(var n=0; n<newkeyArray.length; n++){
						data1[i][newkeyArray[n]] = data2[j][newkeyArray[n]];
					}
				}
			}
		}
		return data1;
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

	var data1, data2;

	d3.csv(this.datafolder + filename1, function(data){
		data1 = data;
		console.log(data1);
		d3.csv(this.datafolder + filename2, function(data){
			data2 = data;
			var json = addValueFromAnotherList(data1, data2, commonkey1, commonkey2, newkeyArray);
			var str = json2csv(json);
			document.write('<pre>'+str+'</pre>');
			return str;
		});
	});


}


/*----------------------------------------------------------------------------------
**-----SVG FILTERS (EXPERIMENTAL)--------------------------------------------------------------------
**----------------------------------------------------------------------------------
*/
PHE.prototype.addFilter = function(){
	var defs = svg.append("defs");

	var blurFilter = defs.append("filter")
		.attr("id", "blur")
		.attr("x", "0")
		.attr("y", "0")

	blurFilter.append("feGaussianBlur")
		.attr("in", "SourceGraphic")
		.attr("stdDeviation", "3");
}

PHE.prototype.setFillImage = function(id, filename, width, height){
	var defs = svg.append("svg:defs");

	var pattern = defs.append("pattern")
		.attr("id", id)
		.attr("width", width)
		.attr("height", height)
		.attr("patternUnits", "userSpaceOnUse");

	pattern.append("image")
		.attr("xlink:href", filename)
		.attr("width", width)
		.attr("height", height)
		.attr("x", "0")
		.attr("y", "0");
}


/*----------------------------------------------------------------------------------
**-----DOM UTILITIES--------------------------------------------------------------------
**----------------------------------------------------------------------------------
*/

PHE.prototype.selectById = function(elId){
	return d3.select("#"+elId);
}


/*----------------------------------------------------------------------------------
**-----FILE UTILITIES--------------------------------------------------------------------
**----------------------------------------------------------------------------------
*/

/*---
**
*/
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


/*----------------------------------------------------------------------------------
**-------------------------------------------------------------------------
**----------------------------------------------------------------------------------
*/
for(var i=0; i<phe.scriptFiles.length; i++){
	document.write("<script src='"+phe.scriptFiles[i]+"'></script>");
}

for(var i=0; i<phe.styleFiles.length; i++){
	document.write("<link rel='stylesheet' type='text/css' href='"+phe.styleFiles[i]+"'/>");
}


window.onload = function(){
	phe.run();
}
