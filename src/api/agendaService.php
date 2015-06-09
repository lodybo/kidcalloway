<?php
	// Include our Agenda class
	require_once("Agenda.php");
	
	// Create an object
	$agenda = new Agenda();
	
	// Now let's see what we're gonna do with our brand new shiny API
	switch($_SERVER["REQUEST_METHOD"]) {
		case "GET":
			// Return all agenda items
			$result = $agenda->getAll();
			break;			
	}
	
	// Create a JSON variant of our result
	$json = json_encode($result);
	
	// Output
	echo $json;
	header('HTTP/1.1 200 OK');
	return;
?>