function Sound(src) {
    this.element = document.createElement("audio");
    this.element.src = src;
    this.element.setAttribute("preload", "auto");
    document.body.appendChild(this.element);
  
	this.play = function(){
        this.element.play();
    }
	
    this.stop = function(){
        this.element.pause();
    }
	
	this.replay = function(){
		this.element.load();
		this.element.play();
	}
}