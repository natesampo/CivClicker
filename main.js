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

window.setInterval(function() {

	day += 1;

	if (1+day%30==1){
		month ++ 
		day=1
	}
	if (1+month%12==1){
		year ++ 
		month=1
	}
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
	dayElement.innerHTML = day;
	monthElement.innerHTML = months[month-1];
	yearElement.innerHTML = year;


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