function cacheDOMElements() {
	foodElement = document.getElementById("food");
	waterElement = document.getElementById("water");
	populationElement = document.getElementById("population");
	employedPopulationElement = document.getElementById("employedPopulation");
	unemployedPopulationElement = document.getElementById("unemployedPopulation");
	yearElement = document.getElementById("year");

	foodElement.innerHTML = food;
	populationElement.innerHTML = population;
	employedPopulationElement.innerHTML = employedPopulation;
	unemployedPopulationElement.innerHTML = population - employedPopulation;
	yearElement.innerHTML = year;
	waterElement.innerHTML = water;
}

var foodElement;
var populationElement;
var employedPopulationElement;
var unemployedPopulationElement;
var yearElement;
var waterElement;

cacheDOMElements();

window.setInterval(function() {

	year += 1;

	food -= population/100;
	water -= population/100;

	for (var i=0;i<publicJobEffects.length;i++) {
		publicJobEffects[i](publicJobNums[i]);
	}

	if(food < 0) {
		cannibalism();
	}

	foodElement.innerHTML = Math.round(food);
	waterElement.innerHTML = Math.round(water);
	populationElement.innerHTML = population;
	employedPopulationElement.innerHTML = employedPopulation;
	unemployedPopulationElement.innerHTML = population - employedPopulation;
	yearElement.innerHTML = year;

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