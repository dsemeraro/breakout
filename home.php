<?php
	session_start();
	require_once __DIR__ . '/php/dbConnection.php';

	if (!isset($_SESSION['userSession'])) {
		header("Location: ./index.php");
	}
	$queryText = "SELECT * FROM utenti WHERE user_id=".$_SESSION['userSession'];
	$query = $dbCon->query($queryText);
	$userRow = $query->fetch_array();
	$dbCon->close();
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title> Breakout - <?php echo $userRow['username'] ?> </title>
	<link rel="stylesheet" href="./css/stile.css">
	
	<script src="./js/game.js"></script>
	<script src="./js/ajaxManager.js"></script>
	<script src="./js/statistics.js"></script>
	<script src="./js/util.js"></script>
	<script src="./js/area.js"></script>
	<script src="./js/pad.js"></script>
	<script src="./js/ball.js"></script>
	<script src="./js/brick.js"></script>
	<script src="./js/popup.js"></script>
	<script src="./js/menu.js"></script>
	<script src="./js/bonus.js"></script>
	<script src="./js/audioManager.js"></script>
	<script src="./js/sound.js"></script>
	

</head>
<body onLoad="begin()">
	
	<div id="left">
		<?php
			echo '<h4 id="user">' . $userRow['username'] . '</h4>';
		?>

		<div id="personalHighScoreDiv">
		</div>
		
		<h4 class="gameInfoLabels">Score</h4>
		<div class="infoContainer">
			<span id="score"></span>
		</div>
		
		<h4 class="gameInfoLabels">Lives</h4>
		<div class="infoContainer">
			<span id="lives"></span>
		</div>
	</div>
	
	<div id="main">
	</div>
	
	<div id="right">

			<a id="logout" href="./php/logout.php?logout"> 
				<img src="./img/logout.png" alt="door"> logout 
			</a>
		
		<button id="musicButton" class="audioButton musicOn" onclick="game.audioManager.stopMusic()"> 
		</button>
		
		<button id="soundsButton" class="audioButton soundsOn" onclick="game.audioManager.stopSounds()" > 
		</button>
		
		<div id="controlsDiv">
			<img src="./img/frecce.png" alt="frecce direzionali">
			<p class="instruction"> move </p>
			<img src="./img/invio.png" alt="invio">
			<p class="instruction"> pause/launch the ball </p>
			<img src="./img/spacebar.png" alt="barra spaziatrice">
			<p class="instruction"> launch the ball </p>
		</div>
	</div>
	
</body>
</html>