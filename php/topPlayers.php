<?php 
	session_start();
	require_once __DIR__ . '/dbConnection.php';
	
	$queryText = "
		SELECT username, max_score 
		FROM utenti 
		WHERE max_score IS NOT NULL 
		ORDER BY max_score DESC
		LIMIT 10
	";
	$query = $dbCon->query($queryText);

	$rows = array();
	while($r = $query->fetch_array()){
		$rows[] = $r;
	}
	$dbCon->close();
	echo json_encode($rows);
	return;
?>