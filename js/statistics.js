function Statistics(){
	this.personalHighScore = 0;
	this.score = null;
	this.lives = null;
	this.level = null;
}

//serve a non cambiare il valore di personalHighScore
Statistics.prototype.reset =
	function(){
		this.score = 0;
		this.lives = 3;
		this.level = 0;
	}

Statistics.prototype.check =
	function(){
		if(this.score > this.personalHighScore){
			this.personalHighScore = this.score;
			this.drawHighScore();
			ajaxManager.setNewHighScore();
		}
		else{
			ajaxManager.topPlayers();
		}
	}

Statistics.prototype.drawHighScore =
	function(){
		var highScoreDiv = document.getElementById("personalHighScoreDiv");
		
		while(highScoreDiv.firstChild){
			highScoreDiv.removeChild(highScoreDiv.firstChild);
		}
		
		var heading = document.createElement("h4");
		var headingText = document.createTextNode("Your best score");
		heading.appendChild(headingText);
		heading.setAttribute("id", "highScoreHeading");
		highScoreDiv.appendChild(heading);
		
		var highScore = document.createElement("span");
		var text = document.createTextNode(this.personalHighScore);
		highScore.setAttribute("id", "personalHighScore");
		highScore.appendChild(text);
		highScoreDiv.appendChild(highScore);
	}

Statistics.prototype.drawStatistics =
	function(type){
		//type -> 0: lives, 1:score
		var str = (type == 0)? "lives" : "score";
		var element = document.getElementById(str);
		if(element.firstChild){
			element.removeChild(element.firstChild);
		}
		var text;
		if(type == 0){
			text = document.createTextNode(this.lives);
		}else if(type == 1){
			text = document.createTextNode(this.score);
		}
		element.appendChild(text);
	}

Statistics.prototype.clearStatistics =
	function(){
		var lives = document.getElementById("lives");
		var actualScore = document.getElementById("score");
		actualScore.removeChild(actualScore.firstChild);
		lives.removeChild(lives.firstChild);
	}