function Ball(Area){
	this.htmlElement = document.createElement("div");
	this.posX = (Area.width-15) / 2;
	this.posY = 535;	//area.pad.offsetTop - 15; // 15 altezza palla
	this.speed = 6;
	//l'angolo è considerato rispetto all'asse y
	this.angle = Math.PI/4;
	this.stepX = this.speed * Math.sin(this.angle);
	this.stepY = -this.speed * Math.sin(this.angle);
}

Ball.prototype.createBall =
	function(area){
		this.htmlElement.setAttribute("class", "ball");
		this.htmlElement.style.top = this.posY + "px";
		this.htmlElement.style.left = this.posX + "px";
		area.appendChild(this.htmlElement);
	}
	
Ball.prototype.startMove =
	function(Pad){
		this.posX = Pad.pos + (Pad.width - this.htmlElement.offsetWidth)/2;
		this.htmlElement.style.left = this.posX + "px";
	}

Ball.prototype.move =
	function(Area){
		this.posX += this.stepX;
		this.posY += this.stepY;
		
		//collisioni con il bordo dell'area di gioco
		var outOfArea = (this.posX > Area.width - this.htmlElement.offsetWidth)
			|| (this.posX < 0) || (this.posY < 0) || (this.posY > Area.height);
		if(outOfArea){
			if(this.posX > Area.width - this.htmlElement.offsetWidth){ //bordo destro
				this.posX = Area.width - this.htmlElement.offsetWidth;
				this.angle = -this.angle;
			}else if(this.posX < 0){ //bordo sinistro
				this.posX = 0;
				this.angle = -this.angle;
			}
			
			if(this.posY < 0){ // bordo superiore
				this.posY = 0;
				this.angle = Math.PI - this.angle;
			}else if(this.posY > Area.height){ //bordo inferiore
				this.htmlElement.parentNode.removeChild(this.htmlElement);
				Area.removeBall(this);
			}
			this.setSpeed();
		}
		
		this.padHit(Area.pad.htmlElement);
		this.brickHit(Area);

		this.htmlElement.style.left = this.posX + "px";
		this.htmlElement.style.top = this.posY + "px";
	}

Ball.prototype.padHit =
	function(pad){ //in ingresso area.pad.htmlElement;
		var isHit = (this.posY > pad.offsetTop - this.htmlElement.offsetHeight) 
				&& (this.posY < pad.offsetTop + pad.offsetHeight)
				&& (this.posX > pad.offsetLeft - this.htmlElement.offsetWidth)
				&& (this.posX < pad.offsetLeft + pad.offsetWidth);
		if(isHit){
			
			if(game.audioManager.soundEffectOn){
				game.audioManager.padEffect.play();
			}
			
			//cambia angolazione della pallina in base alla punto in cui colpisce il pad
			var dist = distanceFromCenter(this.htmlElement, pad);
			this.angle = dist * (Math.PI/3) / (pad.offsetWidth/2);
			this.setSpeed();
		}
	}

Ball.prototype.brickHit =
	function(Area){
		for(var i = 0; i < BRICK_ROW; i++){
			for (var j = 0; j < Area.brick[i].length; j++){
				var brick =  Area.brick[i][j].htmlElement;
				var isHit = (this.posX > brick.offsetLeft - this.htmlElement.offsetWidth) 
						&& (this.posX < brick.offsetLeft + brick.offsetWidth) 
						&& (this.posY > brick.offsetTop - this.htmlElement.offsetHeight) 
						&& (this.posY < brick.offsetTop + brick.offsetHeight);
				if(isHit){
					
					if(game.audioManager.soundEffectOn){
						game.audioManager.brickEffect.replay();
					}
					
					if(this.posY > brick.offsetTop + brick.offsetHeight - this.speed && this.stepY < 0){ //da sotto
						this.posY = brick.offsetTop + brick.offsetHeight;
						this.angle = Math.PI - this.angle;
					}else if(this.posY < brick.offsetTop - this.htmlElement.offsetHeight + this.speed && this.stepY > 0){ //da sopra
						this.posY =  brick.offsetTop - this.htmlElement.offsetHeight;
						this.angle = Math.PI - this.angle;
					}else if(this.posX < brick.offsetLeft - this.htmlElement.offsetWidth + this.speed && this.stepX > 0){ // da sinistra
						this.posX = brick.offsetLeft - this.htmlElement.offsetWidth;
						this.angle = -this.angle;
					}else if(this.posX > brick.offsetLeft + brick.offsetWidth - this.speed && this.stepX < 0){ // da destra
						this.posX = brick.offsetLeft + brick.offsetWidth;
						this.angle = -this.angle;
					}
					
					if(Area.brick[i][j].type != 8){
						game.statistics.score += 10 * this.speed;
						game.statistics.drawStatistics(1);
						Area.deleteBrick(i, j);
					}
					
					this.setSpeed();
				}
			}
		}
	}


//imposta componenti velocità in base all' angolo
Ball.prototype.setSpeed =
	function(){
		
		//questa condizione impedisce alla palla di avere una traiettoria parallela al pad
		if(Math.cos(this.angle) < 0.1 && Math.cos(this.angle) > -0.1){
			this.angle += 0.1;
		}
		
		this.stepX = this.speed * Math.sin(this.angle);
		this.stepY = -this.speed * Math.cos(this.angle);
	}
	
Ball.prototype.changeSpeed =
	function(value){
		//velocità massima = 15
		if(this.speed + value <= 15 && this.speed + value >= 5){
			this.speed += value;
		}else if(value > 0){
			this.speed = 15;
		}else if(value < 0){
			this.speed = 5;
		}
		this.setSpeed();
	}

