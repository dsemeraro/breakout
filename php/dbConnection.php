<?php

  $dbHost = "localhost";
  $dbUser = "root";
  $dbPassword = "";
  $dbName = "breakout";
  
  $dbCon = new MySQLi($dbHost, $dbUser, $dbPassword, $dbName);
    
     if ($dbCon->connect_errno) {
         die("ERRORE : -> ".$dbCon->connect_error);
	 }
?>
