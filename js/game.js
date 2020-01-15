var game = null;

function begin(){
	game = new Game(); //crea istanza gioco
	game.area.createArea();
	intro();
}

function Game(){
	this.timer = null;
	this.ballTimer = null;
	this.area = new Area();
	this.statistics = new Statistics();
	this.audioManager = new AudioManager();
	this.audioManager.song.play();
	ajaxManager.getHighScore();
	//state = 0:pausa, 1:introLevel, 2:beginLevel, 3:play, -1:fuori dal gioco
	this.state = -1;
	document.addEventListener("keydown", this.keyPressHandler.bind(this), false);
	document.addEventListener("keyup", this.keyUpHandler.bind(this), false); 
}

/********************** Loop *************************/

Game.prototype.startLoop =
	function(){
		this.area.pad.move();
		this.area.ball[0].startMove(this.area.pad);
	}
	
Game.prototype.gameLoop =
	function(){
		this.area.pad.move();
		for(var i = 0; i < this.area.ball.length; i++)
			this.area.ball[i].move(this.area);
		for(var j = 0; j < this.area.bonus.length; j++)
			this.area.bonus[j].move(this.area);
	}

Game.prototype.increaseSpeed =
	function(){
		for(var i = 0; i < this.area.ball.length; i++)
			this.area.ball[i].changeSpeed(0.1);
	}
	
/*****************************************************/

/***************** stati del gioco *******************/

//gestisce il messaggio di inizio livello 
//(gli handler devono essere disabilitati);
Game.prototype.introLevel =
	function(){
		this.state = 1;
		clearInterval(game.timer);
		clearInterval(game.ballTimer);
		this.area.createLevel(this.statistics.level);
		introLevelMessage(this.area.htmlElement, this.statistics.level);
		setTimeout(this.beginLevel.bind(this), 1500);
	}

//permette di muovere il pad prima di far partire la palla
Game.prototype.beginLevel =
	function(){
		this.state = 2;
		this.timer = setInterval(this.startLoop.bind(this), 20);
	}

//gioco attivo
Game.prototype.play = 
	function(){ 
		this.state = 3;
		this.timer = setInterval(this.gameLoop.bind(this), 20);
		this.ballTimer = setInterval(this.increaseSpeed.bind(this), 2000);
	}

Game.prototype.pause = 
	function(){
		this.state = 0;
		pauseMessage(this.area.htmlElement);
		clearInterval(this.timer);
		clearInterval(game.ballTimer);
	}

/*****************************************************/
//richiamarla dalla console per vincere il livello
Game.prototype.levelWin =
	function(){
		this.area.clearArea();
		if(this.statistics.level < 4){
			this.statistics.level++;
			this.introLevel();
		}else{
			this.gameOver();
		}
	}

Game.prototype.lifeLost =
	function(){
		if(this.statistics.lives === 1){
			this.gameOver();
		}else{
		 
			this.statistics.lives--;
			this.statistics.drawStatistics(0);
			
			clearInterval(game.timer);
			clearInterval(game.ballTimer);
			
			this.area.restartLevel();
			this.beginLevel();
		}
	}

Game.prototype.newGame =
	function(){
			this.area.clearArea();
		
			this.statistics.reset();
			this.statistics.drawStatistics(0);
			this.statistics.drawStatistics(1);
			
			this.introLevel();
	}
	
Game.prototype.gameOver =
	function(){
		
		clearInterval(game.timer);
		clearInterval(game.balltimer);
		this.area.clearArea();
		this.statistics.clearStatistics();
		
		this.statistics.check();
		
		this.state = -1; //fuori dal gioco
	}


/******************** Handler ************************/	

Game.prototype.keyPressHandler = 
	function(e){
		var key = (e.which != null) ? e.which : e.keyCode; 
		if(this.state !== 1){
			//freccia sinistra
			if(key === 37)
				this.area.pad.leftKey = true;
			
			//freccia destra
			if(key === 39) 
				this.area.pad.rightKey = true;
			
			//Invio
			if(key === 13){

				if(game.audioManager.soundEffectOn){
					game.audioManager.pauseEffect.play();
				}

				if(this.state === 3){
					this.pause();
				}else if(this.state === -1){
					this.newGame();
				}else{
					removePauseMessage();
					clearInterval(this.timer);
					this.play();
				}
			}
			
			if(this.state === 2){
			//Spacebar
				if(key === 32){
					clearInterval(this.timer);
					this.state = 3;
					this.play();
				}
			}			
		}
	}
	
Game.prototype.keyUpHandler = 
	function(e){
		var key = (e.which != null) ? e.which : e.keyCode; 
		//freccia sinistra
		if(key === 37)
			this.area.pad.leftKey = false;
		//freccia destra
		if(key === 39)
			this.area.pad.rightKey = false;
	}

/*****************************************************/