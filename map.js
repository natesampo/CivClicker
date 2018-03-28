var canvas = document.getElementById("mapCanvas");
var mapTab = document.getElementById("mapTab");
canvas.width = Math.round(window.innerWidth*0.89);
canvas.height = Math.round(window.innerHeight*0.94);
var ctx = canvas.getContext("2d");
ctx.lineWidth = 2;
ctx.strokeStyle = "#000"
drawMap();

function drawMap() {
	var tempTerritory;

	for(var i=0;i<territories.length;i++) {
		tempTerritory = territories[i];

		if(tempTerritory.owner == players[0]) {
			ctx.fillStyle = "#00f";
		} else if(tempTerritory.owner == null) {
			ctx.fillStyle = "#000";
		} else {
			ctx.fillStyle = "#f00";
		}

		ctx.beginPath();
		ctx.moveTo(tempTerritory.borders[tempTerritory.borders.length-1][0], tempTerritory.borders[tempTerritory.borders.length-1][1]);
		for(var j=0;j<tempTerritory.borders.length;j+=1) {
			ctx.lineTo(tempTerritory.borders[j][0], tempTerritory.borders[j][1]);
			ctx.stroke();
		}

		ctx.closePath();
		ctx.fill();
	}
}