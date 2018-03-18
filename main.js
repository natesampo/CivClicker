function cacheDOMElements() {
	foodElement = document.getElementById("food");
	waterElement = document.getElementById("water");
	populationElement = document.getElementById("population");
	foodGatheringElement = document.getElementById("foodGathering");
	waterGettingElement = document.getElementById("waterGetting");
	employedPopulationElement = document.getElementById("employedPopulation");
	unemployedPopulationElement = document.getElementById("unemployedPopulation");
	yearElement = document.getElementById("year");

	foodElement.innerHTML = food;
	populationElement.innerHTML = population;
	foodGatheringElement.innerHTML = foodGathering;
	waterGettingElement.innerHTML = waterGetting;
	employedPopulationElement.innerHTML = employedPopulation;
	unemployedPopulationElement.innerHTML = unemployedPopulation;
	yearElement.innerHTML = year;
	waterElement.innerHTML = water;
}

var foodElement;
var populationElement;
var employedPopulationElement;
var foodGatheringElement;
var waterGettingElement;
var employedPopulationElement
var unemployedPopulationElement;
var yearElement;
var waterElement;

cacheDOMElements();

function addGatherFood() {
	if(unemployedPopulation > 0) {
		employedPopulation += 1;
		unemployedPopulation -= 1;
		foodGathering += 1;
		foodGatheringElement.innerHTML = foodGathering.toString();
		employedPopulationElement.innerHTML = employedPopulation.toString();
		unemployedPopulationElement.innerHTML = unemployedPopulation.toString();
	}
}

function removeGatherFood() {
	if(foodGathering > 0) {
		employedPopulation -= 1;
		unemployedPopulation += 1;
		foodGathering -= 1;
		foodGatheringElement.innerHTML = foodGathering.toString();
		employedPopulationElement.innerHTML = employedPopulation.toString();
		unemployedPopulationElement.innerHTML = unemployedPopulation.toString();
	}
}

function addGetWater() {
	if(unemployedPopulation > 0) {
		employedPopulation += 1;
		unemployedPopulation -= 1;
		waterGetting += 1;
		waterGettingElement.innerHTML = waterGetting.toString();
		employedPopulationElement.innerHTML = employedPopulation.toString();
		unemployedPopulationElement.innerHTML = (population - employedPopulation).toString();
	}
}

function removeGetWater() {
	if(waterGetting > 0) {
		employedPopulation -= 1;
		unemployedPopulation += 1;
		waterGetting -= 1;
		waterGettingElement.innerHTML = waterGetting.toString();
		employedPopulationElement.innerHTML = employedPopulation.toString();
		unemployedPopulationElement.innerHTML = unemployedPopulation.toString();
	}
}

window.setInterval(function() {

	year += 1;
	yearElement.innerHTML = year;

	food += -(population/100) + (foodGathering/50);
	foodElement.innerHTML = Math.round(food);

	water += -(population/50) + (waterGetting/12.5);
	waterElement.innerHTML = Math.round(water);

	if(food < 0) {
		cannibalism();
	}

	unemployedPopulationElement.innerHTML = (population - employedPopulation).innerHTML;

}, 100);

function cannibalism() {
	// Kill enough people to make up food deficit:
	var killed = Math.ceil(-food/2);
	population -= killed;
	food += killed * 2;
	if(population <= killed) {
		population = 0;
		console.log('Game over man!');
		food = 0;
		killed = 0;
	} else if(unemployedPopulation >= killed) {
		unemployedPopulation -= killed;
	} else if(unemployedPopulation > 0) {
		killed -= unemployedPopulation;
		unemployedPopulation = 0;
		employedPopulation -= killed;
		killed = 0;
	} else {
		employedPopulation -= killed;
	}
	populationElement.innerHTML = population;
	unemployedPopulationElement.innerHTML = unemployedPopulation;
	employedPopulationElement.innerHTML = employedPopulation;
	foodElement.innerHTML = Math.round(food);
}

function getJobNumber(jobName) {
	for(var i;i<jobNames.length;i++) {
		if(jobNames[i] == jobName) {
			return jobNums[i];
		}
	}
}

function getJobIndex(jobName) {
	for(var i;i<jobNames.length;i++) {
		if(jobNames[i] == jobName) {
			return i;
		}
	}
}

function updateJobs(jobName, delta) {
	jobNums[getJobIndex(jobName)] += delta;
}
