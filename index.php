<?php
	session_start();
	require_once __DIR__ . '/php/dbConnection.php';

	if (isset($_SESSION['userSession'])) {
		header("Location: ./home.php");
		exit;
	}

?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Breakout - login</title> 
	<link rel="stylesheet" href="./css/stile.css" type="text/css">
	<script src="./js/validaForm.js"></script>
</head>
<body>
	<div class="formContainer">
		<h2 class="formHeading">Accedi</h2>
		<form name="modulo" onsubmit="return validaForm(0)" action="./php/login.php" method="post">

			<input type="text" class="formInput loginInput" placeholder="Nome Utente" name="username">
			
			<input type="password" class="formInput loginInput" placeholder="Password" name="password">

			<button type="submit" class="formInput" name="btn-login">
				Login
			</button>
		</form>
		<div id="errorBox">
		<?php	
			if(isset($_GET['errorMessage'])){
				echo '<span>' . $_GET['errorMessage'] . '</span>';
			}
		?>
		</div>
	</div>
	<footer>
		<p>Nuovo utente? <a href="./formRegistrazione.php">Registrati</a> - <a href="./howToPlay.html">How to play</a></p>
	</footer>
</body>
</html>