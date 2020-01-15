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
	<title>Breakout - Registration</title>
	<link rel="stylesheet" href="./css/stile.css" type="text/css">
	<script src="./js/validaForm.js"></script>
</head>
<body>
	<div class="formContainer">
		<h2 class="formHeading">Registrati</h2>
		<form name="modulo" onsubmit="return validaForm(1)" action="./php/register.php" method="post">
			
			<input type="text" class="formInput Registration" placeholder="Username" name="username">
        
			<input type="password" class="formInput Registration" placeholder="Password" name="password">

			<input type="password" class="formInput Registration" placeholder="Conferma password" name="conferma">

			<button type="submit" class="formInput Registration" name="btn-signup">
				Crea Account
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
		<p> Già registrato? <a href="./index.php">Accedi</a> - <a href="./howToPlay.html">How to play</a></p>
	</footer>
</body>
</html>
