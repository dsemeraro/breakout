function AudioManager(){
	this.musicButton = document.getElementById("musicButton");
	this.song = new Sound("./sound/song.mp3");
	this.song.element.loop = true;
	this.songIsPlay = true;

	this.soundsButton = document.getElementById("soundsButton");
	this.brickEffect = new Sound("./sound/brickEffect.mp3");
	this.padEffect = new Sound("./sound/brickEffect.mp3");
	this.bonusEffect = new Sound("./sound/bonusEffect.mp3");
	this.pauseEffect = new Sound("./sound/pauseEffect.mp3");
	this.soundEffectOn = true;
}

AudioManager.prototype.stopMusic =
	function(){
		if(this.songIsPlay){
			this.song.stop();
			this.musicButton.classList.remove("musicOn");
			this.musicButton.classList.add("musicOff");
		}else{
			this.song.play();
			this.musicButton.classList.remove("musicOff");
			this.musicButton.classList.add("musicOn");
		}
		this.songIsPlay = !this.songIsPlay;
		this.musicButton.blur();
	}
	
AudioManager.prototype.stopSounds =
	function(){
		if(this.soundEffectOn){
			this.soundsButton.classList.remove("soundsOn");
			this.soundsButton.classList.add("soundsOff");
		}else{
			this.soundsButton.classList.remove("soundsOff");
			this.soundsButton.classList.add("soundsOn");
		}
		this.soundEffectOn = !this.soundEffectOn;
		this.soundsButton.blur();
	}


