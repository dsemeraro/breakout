function intro(){
		var img = document.createElement("img");
		img.setAttribute("src", "./img/breakoutText.png");
		img.setAttribute("id", "breakoutLogo");
		img.setAttribute("alt", "Breakout!");
		game.area.htmlElement.appendChild(img);
		
		var p = document.createElement("p");
		var txt = document.createTextNode("...press ENTER to start...");
		p.setAttribute("id", "startMessage");
		p.appendChild(txt);
		area.appendChild(p);
	}

function highScoreTable(data){
	var highScoreArray = JSON.parse(data);
	
	var area = game.area.htmlElement;
	
	var img = document.createElement("img");
	img.setAttribute("src", "./img/gameOverText.png");
	img.setAttribute("id", "gameOverLogo");
	img.setAttribute("alt", "Game over");
	game.area.htmlElement.appendChild(img);
	
	var personalScore = document.createElement("p");
	personalScore.setAttribute("id", "personalScoreGameOver");
	var personalScoreText = document.createTextNode("Your score: " + game.statistics.score);
	personalScore.appendChild(personalScoreText);
	area.appendChild(personalScore);
	
	var table = document.createElement('table');
	
	var tableHead = document.createElement('thead');
	table.appendChild(tableHead);
	
	var tableHeadRow = document.createElement('tr');
	tableHead.appendChild(tableHeadRow);

	var tableHeadUserRow = document.createElement('th');
	var tableHeadUserRowText = document.createTextNode("User");
	tableHeadUserRow.appendChild(tableHeadUserRowText);
	tableHeadRow.appendChild(tableHeadUserRow);

	var tableHeadScoreRow = document.createElement('th');
	var tableHeadScoreRowText = document.createTextNode("Score");
	tableHeadScoreRow.appendChild(tableHeadScoreRowText);
	tableHeadRow.appendChild(tableHeadScoreRow);
	
	var tableBody = document.createElement('tbody');
	table.appendChild(tableBody);

	var tableBodyRow = null;
	var tableBodyRowUsernameData = null;
	var tableBodyRowUsernameDataText = null;
	var tableBodyRowScoreData = null;
	var tableBodyRowScoreDataText= null;

	for(var i = 0; i < highScoreArray.length; ++i)
	{
		tableBodyRow = document.createElement('tr');
		tableBody.appendChild(tableBodyRow);

		tableBodyRowUsernameData = document.createElement('td');
		tableBodyRowUsernameDataText = document.createTextNode(highScoreArray[i]["username"]);
		tableBodyRowUsernameData.appendChild(tableBodyRowUsernameDataText);

		tableBodyRowScoreData = document.createElement('td');
		tableBodyRowScoreDataText = document.createTextNode(highScoreArray[i]["max_score"]);
		tableBodyRowScoreData.appendChild(tableBodyRowScoreDataText);

		tableBodyRow.appendChild(tableBodyRowUsernameData);
		tableBodyRow.appendChild(tableBodyRowScoreData);
		
		tableBody.appendChild(tableBodyRow);
	}
	area.appendChild(table);
	
	var p = document.createElement("p");
	var txt = document.createTextNode("...press ENTER to play again...");
	p.setAttribute("id", "gameOverContinue");
	p.appendChild(txt);
	area.appendChild(p);
}

