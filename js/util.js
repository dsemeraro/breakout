/* COSTANTI */
var BRICK_ROW = 18;
var BRICK_COL = 14;

var BRICK_COLOR = [
	"#af2bbf",
	"#eff3db",
	"#403f66",
	"#df6a42",
	"#4991ce",
	"#5eb989",
	"#e2ef70"
];

/* FUNZIONI */

function setPersonalHighScore(data){
	game.statistics.personalHighScore = data;
	game.statistics.drawHighScore();
}

function distanceFromCenter(obj1, obj2){
	var center1 = (parseInt(obj1.offsetLeft) + (parseInt(obj1.offsetWidth) / 2));
	var center2 = (parseInt(obj2.offsetLeft) + (parseInt(obj2.offsetWidth) / 2));
 	return center1 - center2;
}

/* LIVELLI 
	0: vuoto
	1: viola
	2: bianco
	3: blu notte
	4: rosso
	5: celeste
	6: verde
	7: giallo
	8: metallo
*/

var level =  
[	
	[
		[3, 3, 3, 2, 2, 3, 3, 3, 3, 2, 2, 3, 3, 3],
		[2, 2, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 2, 2],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[8, 6, 5, 4, 7, 1, 0, 0, 1, 7, 4, 5, 6, 8],
		[0, 5, 4, 7, 1, 0, 0, 0, 0, 1, 7, 4, 5, 0],
		[8, 4, 7, 1, 0, 0, 1, 1, 0, 0, 1, 7, 4, 8],
		[0, 7, 1, 0, 0, 1, 7, 7, 1, 0, 0, 1, 7, 0],
		[8, 1, 0, 0, 1, 7, 4, 4, 7, 1, 0, 0, 1, 8],
		[0, 0, 0, 1, 7, 4, 5, 5, 4, 7, 1, 0, 0, 0],
		[0, 0, 1, 7, 4, 5, 6, 6, 5, 4, 7, 1, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[3, 3, 3, 2, 2, 3, 3, 3, 3, 2, 2, 3, 3, 3],
		[2, 2, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 2, 2],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	],
	[
		[2, 2, 2, 2, 0, 7, 7, 7, 7, 0, 2, 2, 2, 2],
		[3, 3, 3, 3, 0, 3, 3, 3, 3, 0, 3, 3, 3, 3],
		[7, 7, 7, 7, 0, 2, 2, 2, 2, 0, 7, 7, 7, 7],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 8, 8, 8, 0, 0, 8, 8, 8, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[7, 7, 7, 7, 0, 2, 2, 2, 2, 0, 7, 7, 7, 7],
		[3, 3, 3, 3, 0, 3, 3, 3, 3, 0, 3, 3, 3, 3],
		[2, 2, 2, 2, 0, 7, 7, 7, 7, 0, 2, 2, 2, 2],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 8, 8, 8, 0, 0, 8, 8, 8, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[2, 2, 2, 2, 0, 7, 7, 7, 7, 0, 2, 2, 2, 2],
		[3, 3, 3, 3, 0, 3, 3, 3, 3, 0, 3, 3, 3, 3],
		[7, 7, 7, 7, 0, 2, 2, 2, 2, 0, 7, 7, 7, 7],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	],
	[
		[0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 6, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 6, 5, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 6, 5, 2, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 6, 5, 2, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 6, 5, 2, 4, 1, 3, 0, 0, 0, 0, 0, 0, 0],
		[0, 6, 5, 2, 4, 1, 3, 6, 0, 0, 0, 0, 0, 0],
		[0, 6, 5, 2, 4, 1, 3, 6, 5, 0, 0, 0, 0, 0],
		[0, 6, 5, 2, 4, 1, 3, 6, 5, 2, 0, 0, 0, 0],
		[0, 6, 5, 2, 4, 1, 3, 6, 5, 2, 4, 0, 0, 0],
		[0, 6, 5, 2, 4, 1, 3, 6, 5, 2, 4, 1, 0, 0],
		[0, 6, 5, 2, 4, 1, 3, 6, 5, 2, 4, 1, 3, 0],
		[0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	],
	[
		[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
		[2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
		[2, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 2],
		[2, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 2],
		[2, 0, 4, 0, 6, 6, 6, 6, 6, 6, 0, 4, 0, 2],
		[2, 0, 4, 0, 6, 0, 0, 0, 0, 6, 0, 4, 0, 2],
		[2, 0, 4, 0, 6, 0, 8, 8, 0, 6, 0, 4, 0, 2],
		[2, 0, 4, 0, 6, 0, 0, 0, 0, 6, 0, 4, 0, 2],
		[2, 0, 4, 0, 6, 6, 6, 6, 6, 6, 0, 4, 0, 2],
		[2, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 2],
		[2, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 2],
		[2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
		[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	],
	[
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 3, 0, 0, 0, 2, 0, 0, 0, 0, 0, 4, 4, 0],
		[3, 3, 3, 3, 0, 2, 0, 0, 0, 0, 4, 0, 0, 4],
		[0, 3, 0, 0, 0, 2, 2, 2, 0, 0, 4, 4, 4, 4],
		[0, 3, 0, 0, 0, 2, 0, 0, 2, 0, 4, 0, 0, 0],
		[0, 0, 3, 0, 0, 2, 0, 0, 2, 0, 0, 4, 4, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7],
		[5, 0, 0, 5, 0, 6, 6, 6, 0, 0, 0, 7, 7, 7],
		[5, 5, 5, 5, 0, 6, 0, 0, 6, 0, 7, 0, 0, 7],
		[5, 0, 0, 0, 0, 6, 0, 0, 6, 0, 7, 0, 0, 7],
		[0, 5, 5, 0, 0, 6, 0, 0, 6, 0, 0, 7, 7, 7],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	]
];
	
