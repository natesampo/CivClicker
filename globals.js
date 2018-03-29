//Time
var day = 1;
var month = 1;
var year = 1;

var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
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
class Job {
	constructor(name, workers, element, effect) {
		this.name = name;
		this.workers = workers;
		this.element = element;
		this.effect = effect;
	}
}

var publicJobs = [];
var privateJobs = [];

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
	for(var i=0;i<publicJobs.length;i++) {
		if(publicJobs[i].name == jobName) {
			return publicJobs[i].workers;
		}
	}
}

function getPublicJobIndex(jobName) {
	for(var i=0;i<publicJobs.length;i++) {
		if(publicJobs[i].name == jobName) {
			return i;
		}
	}
}

function updatePublicJobs(jobName, delta) {
	var tempJob = publicJobs[getPublicJobIndex(jobName)];

	if(delta > 0) {
		if(population - employedPopulation >= delta) {
			tempJob.workers += delta;
			employedPopulation += delta;
		} else {
			tempJob.workers += population - employedPopulation;
			employedPopulation = population;
		}
	} else if(delta < 0) {
		if(tempJob.workers >= -delta) {
			tempJob.workers += delta;
			employedPopulation += delta;
		} else {
			employedPopulation -= tempJob.workers;
			tempJob.workers = 0;
		}
	}

	employedPopulationElement.innerHTML = employedPopulation;
	unemployedPopulationElement.innerHTML = population - employedPopulation;
	tempJob.element.innerHTML = tempJob.workers + "<br><br>";
}

function makePublicJob(jobName, workers, effect) {
	var newJobWrapper = document.createElement("newJobWrapper");
	newJobWrapper.setAttribute("class", "jobWrapper");
	newJobWrapper.innerHTML = "<br><br>" + jobName + ": ";
	document.getElementById("centerColumn").appendChild(newJobWrapper);

	var newJobCounter = document.createElement("newJobCounter");
	newJobCounter.setAttribute('class', 'jobCounter');
	newJobCounter.innerHTML = workers + "<br><br>";
	newJobWrapper.appendChild(newJobCounter);

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

	publicJobs.push(new Job(jobName, 0, newJobCounter, effect));
	updatePublicJobs(jobName, workers);
}

function removePublicJob(jobName) {
	var tempIndex = getPublicJobIndex(jobName);
	var tempJob = publicJobs[tempIndex];
	employedPopulation += tempJob.workers;
	publicJobs.splice(tempIndex, 1);
}