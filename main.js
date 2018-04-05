function cacheDOMElements() {
	foodElement = document.getElementById("food");
	waterElement = document.getElementById("water");
	populationElement = document.getElementById("population");
	employedPopulationElement = document.getElementById("employedPopulation");
	unemployedPopulationElement = document.getElementById("unemployedPopulation");
	dayElement = document.getElementById("day");
	monthElement = document.getElementById("month");
	yearElement = document.getElementById("year");

	foodElement.innerHTML = food;
	populationElement.innerHTML = population;
	employedPopulationElement.innerHTML = employedPopulation;
	unemployedPopulationElement.innerHTML = population - employedPopulation;
	dayElement.innerHTML = day;
	waterElement.innerHTML = water;
	monthElement.innerHTML = months[month-1];
	yearElement.innerHTML = year;
}

var foodElement;
var populationElement;
var employedPopulationElement;
var unemployedPopulationElement;
var dayElement;
var waterElement;
var monthElement;
var yearElement;

cacheDOMElements();

makePublicJob("FoodGathering", Math.round(population/2), function(workers) { food += workers/50 });
makePublicJob("WaterGetting", Math.round(population/4), function(workers) { water += workers/25 });
makePublicJob("ConsoleLogging", 1, function(workers) { for(var i=0;i<workers;i++) { console.log("hello") }});

window.setInterval(function() {
	if(!paused) {
		day++;

		if(day > 30) {
			month ++;
			day=1;
		}
		if(month > 12) {
			year ++;
			month=1;
		}
		food -= population/100;
		water -= population/100;

		for (var i=0;i<publicJobs.length;i++) {
			publicJobs[i].effect(publicJobs[i].workers);
		}

		if(food < 0) {
			cannibalism();
		}

		if(water < 0) {
			var killed = Math.ceil(population/100);
			if(population > killed) {
				if(population-employedPopulation >= killed) {
					population -= killed;
				} else {
					population -= killed;
					employedPopulation = population;
				}
			} else {
				population = 0;
				employedPopulation = 0;
			}
			water = 0;
		}

		foodElement.innerHTML = Math.round(food);
		waterElement.innerHTML = Math.round(water);
		populationElement.innerHTML = population;
		employedPopulationElement.innerHTML = employedPopulation;
		unemployedPopulationElement.innerHTML = population - employedPopulation;
		dayElement.innerHTML = day;
		monthElement.innerHTML = months[month-1];
		yearElement.innerHTML = year;
	}

}, 500);

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
	} else if(population - employedPopulation >= killed) {
		population -= killed;
	} else if(population - employedPopulation > 0) {
		killed -= population - employedPopulation;
		population -= killed;
		killed = 0;
	} else {
		employedPopulation -= killed;
	}
}