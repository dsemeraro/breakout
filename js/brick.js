function Brick(lvl, x, y){
	this.htmlElement = document.createElement("div");
	this.type = level[lvl][y][x];
	this.height = 20;
	this.width = 50;
	this.posX = (50 + x * this.width);
	this.posY = (50 + y * this.height);
	this.bonus = Math.floor(Math.random() + 0.1);
	//0: assente 1: presente
}

Brick.prototype.createBrick = 
	function(area){
		this.htmlElement.setAttribute("class", "brick");
		this.htmlElement.style.height = this.height + "px";
		this.htmlElement.style.width = this.width + "px";
		this.htmlElement.style.left = this.posX + "px";
		this.htmlElement.style.top = this.posY + "px";
		
		if(this.type <= 7 && this.type >= 1){
			this.htmlElement.style.backgroundColor = BRICK_COLOR[this.type-1];
		}
		else if(this.type === 8){
			this.htmlElement.classList.add("metal");
		}
		area.appendChild(this.htmlElement);
	}

	
