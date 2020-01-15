<?php
	session_start();
	if (isset($_SESSION['userSession'])) {
		header("Location: ./../home.php");
	}
	
	require_once __DIR__ . '/dbConnection.php';

	if(isset($_POST['btn-signup'])) {
 
		$uName = $_POST['username'];
		$uPass = $_POST['password'];

		$uName = $dbCon->real_escape_string($uName);
		$uPass = $dbCon->real_escape_string($uPass);

		$check_user = $dbCon->query("SELECT username FROM utenti WHERE username='$uName'");
		$count = $check_user->num_rows;

		if($count==0){

			$queryText = "INSERT INTO utenti(username, password) VALUES('$uName','$uPass')";

			if($dbCon->query($queryText)){
				$result = $dbCon->query("SELECT LAST_INSERT_ID()");
				$userId = $result->fetch_array();
				$_SESSION['userSession'] = $userId[0];
				header("Location: ./../home.php");
			}else{
				$msg = "errore durante la registrazione!";
				header("Location: ./../formRegistrazione.php?errorMessage=" . $msg);
			}
		}else{
			$msg = "nome utente occupato!";
			header("Location: ./../formRegistrazione.php?errorMessage=" . $msg);
		}
		$dbCon->close();
	}
?>
