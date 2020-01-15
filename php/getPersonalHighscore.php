<?php 
	session_start();
	require_once __DIR__ . '/dbConnection.php';
	
	$queryText = "SELECT max_score FROM utenti WHERE user_id=".$_SESSION['userSession'];
	$query = $dbCon->query($queryText);
	$userRow = $query->fetch_array();
	$dbCon->close();
	echo $userRow['max_score'];
	return;
?>