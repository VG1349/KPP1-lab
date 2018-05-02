var readlineSync = require('readline-sync');

var world_height = 30;
var world_width = 30;
var world = [];
(function createFW(){
	for(i = 0; i < world_width; i++){
		world[i] = [];
		for(j = 0;j < world_height; j++){
			world[i][j] = 0;
		};
	};

	var selectArr = ['\x1b[31m\Auto filling', 'Manual filling'];
	var selectCreate = readlineSync.keyInSelect(selectArr, "What method do you want to use?");
	if(selectCreate == 1){
		CreateArrUser(world);
	} else {
		autoCreateArr(world);
	}

	setInterval(function(){
		nextGeneration()
	}, 300);

})();

function SelectArray(count){
	var SelectArr = [];
	for(var i = 0; i < count; i++){
		SelectArr[i] = i;
	}
	return SelectArr;
};

function CountLiveNeighboards(x,y){
	var count = 0;
	for( var i = x - 1; i <= x + 1; i++){
		for( var j = y - 1; j <= y + 1; j++){
			if((i == x && j == y) || (i < 0 || j < 0) || (i >= world_width || j >= world_height)){
				continue;
			}
			if(world[i][j] == 1) {
				count++;
			}
		}
	}
	return count;
};

function nextGeneration(){
	console.log("\x1Bc");
	var live_nb;
	var next_world = [];

	for(i = 0; i < world_width; i++){
		next_world[i] = [];
		for(j = 0; j < world_height; j++){
			next_world[i][j] = 0;
			live_nb = CountLiveNeighboards(i, j);
			if(world[i][j] == 0){
				if(live_nb == 3){
					next_world[i][j] = 1;
				}
			} else {
				if(live_nb == 2 || live_nb == 3){
					next_world[i][j] = 1;
				}
			}
		}
	}
	world = next_world.slice();
		for(var i = 0; i < world_width; i++){
			var elem = world[i].toString().replace(/\,/g, " ").replace(/0/g, " ").replace(/1/g, "*");
			console.log('\x1b[31m',elem);
		}
};
function CreateArrUser(world){
	do{
		var indexRow = readlineSync.keyInSelect(SelectArray(world_width), 'Select row to add life');
		var indexColumn = readlineSync.keyInSelect(SelectArray(world_height), 'Select column to add life');

		world[indexRow][indexColumn] = 1;
		console.log(world);
	} while (readlineSync.keyInYN('Add life?'));

	return world;
};
function autoCreateArr(world, k = 0.5){
	for(var i = 0; i < world_width; i++){
		for(var j = 0; j < world_height; j++){
			if(Math.random() > k){
				world[i][j] = 1;
			} else {
				world[i][j] = 0;
			}
		}
	}
	return world;
};
