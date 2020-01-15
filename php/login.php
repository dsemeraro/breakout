<?php
	session_start();
	require_once __DIR__ . '/dbConnection.php';

	if (isset($_SESSION['userSession'])) {
		header("Location: ./home.php");
		exit;
	}

	if (isset($_POST['btn-login'])) {
		$user =	$_POST['username'];
		$password = $_POST['password'];
		
		//filtro per SQLinjection
		$user = $dbCon->real_escape_string($user);
		$password = $dbCon->real_escape_string($password);
		
		$queryText = "
			SELECT * 
			FROM utenti 
			WHERE BINARY username = '" . $user . "' 
				AND BINARY password = '" . $password . "'";
 		$query = $dbCon->query($queryText);
		$userRow = $query->fetch_array();
		$count = $query->num_rows;
		if ($count == 1){
			$_SESSION['userSession'] = $userRow['user_id'];
			header("Location: ./../home.php");
		}else{
			$msg = "Nome utente o Password non validi!";
			header("Location: ./../index.php?errorMessage=" . $msg);
		}
		$dbCon->close();
	}
?>
