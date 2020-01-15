function ajaxManager(){}

ajaxManager.getObject =
	function(){
		var xmlHttp = null;
		try 
		{ 
			xmlHttp = new XMLHttpRequest(); 
		} 
			catch(e) 
			{
				try 
				{ 
					xmlHttp = new ActiveXObject("Msxml2.XMLHTTP"); //IE (recent versions)
				} 
					catch(e)
					{
						try 
						{ 
							xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); //IE (older versions)
						} 
							catch(e) 
							{
								xmlHttp = null; 
							}
					}
			}	

		return xmlHttp;
	}

ajaxManager.performRequest = 
	function(method, url, isAsync, dataToSend, responseFunction)
	{
		var xmlHttp = ajaxManager.getObject();
		if (xmlHttp === null)
		{
			window.alert("Your browser does not support AJAX!");
			return;
		}

		xmlHttp.open(method, url, isAsync); 
		xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		
		xmlHttp.onreadystatechange = function (){
			if (xmlHttp.readyState == 4){
				var data = xmlHttp.responseText;	
				responseFunction(data);
			}
		}
		
		xmlHttp.send(dataToSend);
}

ajaxManager.getHighScore =
	function(){
		var url = "./php/getPersonalHighScore.php";
		ajaxManager.performRequest("post", url, true, null, setPersonalHighScore);
	}

ajaxManager.setNewHighScore =
	function()
	{
		var url = "./php/setNewHighScore.php";
		var vars = "score="+game.statistics.score;

		ajaxManager.performRequest("POST", url, true, vars, ajaxManager.topPlayers);
	}
	
ajaxManager.topPlayers =
	function()
	{
		var url = "./php/topPlayers.php";

		ajaxManager.performRequest("POST", url, true, null, highScoreTable);
	}
