function Bonus(){
	this.htmlElement = document.createElement("div");
	//il bonus vita+ ha meno probabilità di essere creato rispetto agli altri
	this.type = Math.floor(Math.random()*5.3);
	this.top = 0;
}

Bonus.prototype.createElement =
	function(Brick){
		this.htmlElement.classList.add("bonus");
		this.htmlElement.classList.add("bonusType" + this.type);
		this.top = Brick.posY;
		this.htmlElement.style.top = this.top + "px";
		this.htmlElement.style.left = Brick.posX + "px";
		game.area.htmlElement.appendChild(this.htmlElement);
	}
	
Bonus.prototype.move =
	function(Area){
		this.top += 4;
		
		//fuori area
		if(this.top > Area.height){
			this.htmlElement.parentNode.removeChild(this.htmlElement);
			Area.removeBonus(this); 
		}
		
		//pad collision
		var pad = Area.pad.htmlElement;
		var isHit = this.htmlElement.offsetLeft > pad.offsetLeft - this.htmlElement.offsetWidth 
					&& this.htmlElement.offsetLeft < pad.offsetLeft + pad.offsetWidth
					&& this.htmlElement.offsetTop > pad.offsetTop - this.htmlElement.offsetHeight
					&& this.htmlElement.offsetTop < pad.offsetTop + pad.offsetHeight;
		if(isHit){
			
			if(game.audioManager.soundEffectOn){
				game.audioManager.bonusEffect.play();
			}
			
			this.collisionHandler(Area);
			Area.removeBonus(this);
			this.htmlElement.parentNode.removeChild(this.htmlElement);
			
			game.statistics.score += 150;
			game.statistics.drawStatistics(1);
		}
		
		this.htmlElement.style.top = this.top + "px";
	}

Bonus.prototype.collisionHandler = 
	function(Area){
		switch(this.type){
			case 0:
				Area.pad.resizePad(-20);
				break;
			case 1:
				Area.pad.resizePad(20);
				break;
			case 2:
				Area.doubleBall();
				break;
			case 3:
				for(var i = 0; i < Area.ball.length; i++)
					Area.ball[i].changeSpeed(2.5);
				break;
			case 4:
				for(var i = 0; i < Area.ball.length; i++)
					Area.ball[i].changeSpeed(-2.5);
				break;
			case 5:
				game.statistics.lives++;
				game.statistics.drawStatistics(0);
				break;
			default:
				console.log(this.type);
		}
	}
