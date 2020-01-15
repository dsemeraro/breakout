function Area(){
	this.htmlElement = document.createElement("div");
	this.width = 800;
	this.height = 600;
	this.pad = null;
	this.ball = new Array();
	this.brickNumber = 0; // forse inutile
	this.brick = new Array(BRICK_ROW);
	this.bonus = new Array();
}

Area.prototype.createArea =
	function(){

		var main = document.getElementById("main");
		this.htmlElement.setAttribute("id", "area");
		this.htmlElement.style.width = this.width + "px"; //sistemare onresize
		this.htmlElement.style.height = this.height + "px"; //pure lui
		
		main.appendChild(this.htmlElement);
	}
	
Area.prototype.createLevel =
	function(lvl){

		this.pad = new Pad(this);
		this.pad.createPad(this.htmlElement);

		var app = new Ball(this);
		this.ball.push(app);
		this.ball[0].createBall(this.htmlElement);
		
		for(var row = 0; row < BRICK_ROW; row++){
			this.brick[row] = new Array();
			for(var col = 0; col < BRICK_COL; col++){
				if(level[lvl][row][col] != 0){
					var app = new Brick(lvl, col, row);
					this.brick[row].push(app);
					app.createBrick(this.htmlElement);
					if(level[lvl][row][col] != 8)
						this.brickNumber++;
				}
			}
		}
	}
	
Area.prototype.restartLevel =
	function(){
		
		this.htmlElement.removeChild(this.pad.htmlElement);
		this.pad = new Pad(this);
		this.pad.createPad(this.htmlElement);
		
		for(var j = 0; j < this.ball.length; j++){
			this.htmlElement.removeChild(this.ball[j].htmlElement);
		}
		
		this.ball[0] = new Ball(this);
		this.ball[0].createBall(this.htmlElement);
		
		for(var i = 0; i < this.bonus.length; i++){ 
			this.htmlElement.removeChild(this.bonus[i].htmlElement);
		}
		this.bonus.length = 0;
	}
	
Area.prototype.clearArea = 
	function(){
		while(this.htmlElement.firstChild){
			this.htmlElement.removeChild(this.htmlElement.firstChild);
		}
		this.brickNumber = 0;
		this.ball.length = 0;
		this.bonus.length = 0;
		// forse inutile! Comunque troppo lento...
		for(var i = 0; i < BRICK_ROW; i++){
			if(this.brick[i]){
				this.brick[i].length = 0;
			}
			/*while(this.brick[i].length != 0){
				this.brick[i].pop();
			}*/
		}
	}

Area.prototype.deleteBrick =
	function(row, col){
		if(this.brick[row][col].bonus === 1){
			var b = new Bonus();
			b.createElement(this.brick[row][col]);
			this.bonus.push(b);
		}
		
		var brick = this.brick[row][col].htmlElement;
		this.htmlElement.removeChild(brick);
		
		this.brick[row].splice(col, 1);
		
		this.brickNumber--;
		if(this.brickNumber === 0){
			game.levelWin();
		}
	}
	
Area.prototype.deletePad =
	function(){
		var pad = this.pad.htmlElement;
		this.htmlElement.removeChild(pad);
	}

Area.prototype.removeBall =
	function(Obj){
		var index = this.ball.indexOf(Obj);
		this.ball.splice(index, 1);
		if(this.ball.length === 0){
			game.lifeLost();
		}
	}

Area.prototype.removeBonus =
	function(Obj){
		var index = this.bonus.indexOf(Obj);
		this.bonus.splice(index, 1);
	}

Area.prototype.doubleBall =
	function(){
		var num = this.ball.length;
		for(var i = 0; i < num; i++){
			var ball = this.ball[i];
			ball.angle -= Math.PI/6;
			ball.setSpeed();
			var b1 = new Ball(this.htmlElement);
			b1.posX = ball.posX;
			b1.posY = ball.posY;
			b1.speed = ball.speed;
			b1.angle = ball.angle + Math.PI/6;
			b1.setSpeed();
			b1.createBall(this.htmlElement);
			this.ball.push(b1);
		}
	}

/*
Area.prototype.tripleBall =
	function(){
		var num = this.ball.length;
		for(var i = 0; i < num; i++){
			var ball = this.ball[i];
			var b1 = new Ball(this.htmlElement);
			b1.posX = ball.posX;
			b1.posY = ball.posY;
			b1.speed = ball.speed;
			b1.angle = ball.angle + Math.PI/6;
			b1.setSpeed();
			b1.createBall(this.htmlElement);
			this.ball.push(b1);
			
			var b2 = new Ball(this.htmlElement);
			b2.posX = ball.posX;
			b2.posY = ball.posY;
			b2.speed = ball.speed;
			b2.angle = ball.angle - Math.PI/6;
			b2.setSpeed();
			b2.createBall(this.htmlElement);
			this.ball.push(b2);
		}
	}
*/