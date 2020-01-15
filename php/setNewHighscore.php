<?php
	session_start();
	require_once __DIR__ . '/dbConnection.php';
	
	if (isset($_SESSION['userSession'])){
		$queryText = "
			UPDATE utenti
			SET max_score = ".$_POST['score']." 
			WHERE user_id = ".$_SESSION['userSession'];

		$dbCon->query($queryText);
		
	}
	$dbCon->close();
	return;
?>
