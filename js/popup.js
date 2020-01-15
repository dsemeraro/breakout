function introLevelMessage(area, lvl){
	lvl++;
	var message = document.createElement("div");
	var text = document.createTextNode("level " + lvl);
	message.appendChild(text);
	message.setAttribute("class", "message");
	area.appendChild(message);
	
	setTimeout(
		function(){
			area.removeChild(message);
		} , 1500);
}

function pauseMessage(area){
	var message = document.createElement("div");
	var text = document.createTextNode("|| Pause");
	message.appendChild(text);
	message.setAttribute("class", "message");
	message.setAttribute("id", "pause");
	area.appendChild(message);
}

function removePauseMessage(){
	var msg = document.getElementById("pause");
	if(!msg)
		return;
	msg.parentNode.removeChild(msg);
}