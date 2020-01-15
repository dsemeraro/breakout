function Pad(Area){
	this.htmlElement = document.createElement("div");
	this.width = 100; //in px
	this.speed = 12;
	this.leftBorder = 0;			//togliere
	this.rightBorder = Area.width;  //togliere
	this.pos = (Area.width - this.width) / 2;
	this.leftKey = false;
	this.rightKey = false;
}

Pad.prototype.createPad = 
	function(area){
		this.htmlElement.setAttribute("id", "pad");
		this.htmlElement.style.width = this.width + "px";
		this.htmlElement.style.left = this.pos + "px";
		area.appendChild(this.htmlElement);
	}
	
Pad.prototype.move =
	function(){
		if(this.leftKey === true)
			this.pos -= this.speed;
		if(this.rightKey === true)
			this.pos += this.speed;
		if(this.pos < 0)
			this.pos = 0;
		if(this.pos > this.rightBorder - this.width)
			this.pos = this.rightBorder - this.width;
		this.htmlElement.style.left = this.pos + "px";
	}

Pad.prototype.resizePad =
	function(val){
		if((this.width < 140 && val > 0) || (this.width > 40 && val < 0))
			this.width += val;
		//else if(this.width > 40 &&)
		this.htmlElement.style.width = this.width + "px";
	}
