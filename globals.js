//Time
var year = 0;

//Population
var population = 10;
var employedPopulation = 0;
var unemployedPopulation = 100;

//var foodGathering = 0;
//var waterGetting = 0;

var jobNames = ["foodGathering", "waterGetting"];
var jobNums = [0, 0];

//Resources
var food = 20;
var water = 10;







//Tab Navigation
var i, tabcontent, tablinks;

tabcontent = document.getElementsByClassName("tabcontent");
tabcontent[0].style.display = "block";
for(i = 1; i<tabcontent.length; i++) {
	tabcontent[i].style.display = "none";
}

tablinks = document.getElementsByClassName("tablinks");
tablinks[0].className += " active";
for(i = 1; i<tablinks.length; i++) {
	tablinks[i].className = tablinks[i].className.replace(" active", "");
}

function openTab(evt, tabName) {
	console.log(evt.currentTarget);

	tabcontent = document.getElementsByClassName("tabcontent");
	for(i = 0; i<tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	tablinks = document.getElementsByClassName("tablinks");
	for(i = 0; i<tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	document.getElementById(tabName).style.display = "block";

	evt.currentTarget.className += " active";
}