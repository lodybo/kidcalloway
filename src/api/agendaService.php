<?php
	// Include our Agenda class
	require_once("Agenda.php");
	
	// Create an object
	$agenda = new Agenda();
	
	// Now let's see what we're gonna do with our brand new shiny API
	switch($_SERVER["REQUEST_METHOD"]) {
		case "GET":
			// Check if there's an ID parameter present
			$id = explode("/api/agenda/", $_SERVER["REQUEST_URI"]);
			
			if (isset($id[1])) {
				// Yes, we only need to retrieve 1 item
				$result = $agenda->get($id[1]);
				break;
			}
			
			// No, return all agenda items
			$result = $agenda->getAll();
			break;			
	}
	
	// Create a JSON variant of our result
	$json = json_encode($result);
	
	// Output
	header('Content-Type: application/json');
	header('HTTP/1.1 200 OK');
	echo $json;
	return;
?>