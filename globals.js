//Time
var year = 0;

//Players
var players = [];
players.push("Player0");
players.push("Player1");

//Population
var population = 10;
var employedPopulation = 0;

//Resources
var food = 20;
var water = 10;

//Territories
var territories = [];

class Territory {
	constructor(borders, owner) {
		this.borders = borders;
		this.owner = owner;
		territories.push(this);
	}
}

new Territory([[5,5], [100,50], [50,100], [10,90]], players[0]);
new Territory([[100,50], [50,100], [60,120], [65,135], [70,118], [65,110], [90,70]], players[1]);

//Jobs
var publicJobNames = [];
var publicJobNums = [];
var publicJobElements = [];
var publicJobEffects = [];
makePublicJob("FoodGathering", Math.round(population/2), function(workers) { food += workers/50 });
makePublicJob("WaterGetting", Math.round(population/4), function(workers) { water += workers/25 });
makePublicJob("ConsoleLogging", 1, function(workers) { for(var i=0;i<workers;i++) { console.log("hello") }});





//Tab Navigation
var tabcontent = document.getElementsByClassName("tabcontent");
tabcontent[0].style.display = "block";
for(var i = 1; i<tabcontent.length; i++) {
	tabcontent[i].style.display = "none";
}

var tablinks = document.getElementsByClassName("tablinks");
tablinks[0].className += " active";
for(var i = 1; i<tablinks.length; i++) {
	tablinks[i].className = tablinks[i].className.replace(" active", "");
}

function openTab(evt, tabName) {
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



//Job Stuff
function getPublicJobWorkers(jobName) {
	for(var i=0;i<publicJobNames.length;i++) {
		if(publicJobNames[i] == jobName) {
			return publicJobNums[i];
		}
	}
}

function getPublicJobIndex(jobName) {
	for(var i=0;i<publicJobNames.length;i++) {
		if(publicJobNames[i] == jobName) {
			return i;
		}
	}
}

function updatePublicJobs(jobName, delta) {
	var tempIndex = getPublicJobIndex(jobName);
	var tempNum = publicJobNums[tempIndex];
	if(delta > 0) {
		if(population - employedPopulation >= delta) {
			publicJobNums[tempIndex] += delta;
			employedPopulation += delta;
		} else {
			publicJobNums[tempIndex] += population - employedPopulation;
			employedPopulation = population;
		}
	} else if(delta < 0) {
		if(tempNum >= -delta) {
			publicJobNums[tempIndex] += delta;
			employedPopulation += delta;
		} else {
			employedPopulation -= publicJobNums[tempIndex];
			publicJobNums[tempIndex] = 0;
		}
	}

	publicJobElements[tempIndex].innerHTML = getPublicJobWorkers(jobName) + "<br><br>";
}

function makePublicJob(jobName, workers, effect) {
	publicJobNames.push(jobName);
	publicJobNums.push(0);
	publicJobEffects.push(effect);

	var newJobWrapper = document.createElement("newJobWrapper");
	newJobWrapper.setAttribute("class", "jobWrapper");
	newJobWrapper.innerHTML = "<br><br>" + jobName + ": ";
	document.getElementById("centerColumn").appendChild(newJobWrapper);

	var newJobCounter = document.createElement("newJobCounter");
	newJobCounter.setAttribute('class', 'jobCounter');
	newJobCounter.innerHTML = workers + "<br><br>";
	newJobWrapper.appendChild(newJobCounter);
	publicJobElements.push(newJobCounter);

	var newJobAddButton = document.createElement("newJobAddButton");
	newJobAddButton.setAttribute('class', 'addButton');
	newJobAddButton.innerHTML = "Add";
	newJobAddButton.type = "button";
	newJobAddButton.addEventListener('click', function() { updatePublicJobs(jobName, 1) });
	document.getElementById("centerColumn").appendChild(newJobAddButton);

	var newJobRemoveButton = document.createElement("newJobRemoveButton");
	newJobRemoveButton.setAttribute('class', 'removeButton');
	newJobRemoveButton.innerHTML = "Remove";
	newJobRemoveButton.type = "button";
	newJobRemoveButton.addEventListener('click', function() { updatePublicJobs(jobName, -1) });
	document.getElementById("centerColumn").appendChild(newJobRemoveButton);

	updatePublicJobs(jobName, workers);
}

function removePublicJob(jobName) {
	var tempIndex = getPublicJobIndex(jobName);
	employedPopulation += publicJobNums[tempIndex];
	publicJobNames.splice(tempIndex, 1);
	publicJobNums.splice(tempIndex, 1);
	publicJobElems.splice(tempIndex, 1);
	publicJobEffects.splice(tempIndex, 1);
}