<?php
	// Include our Agenda class
	require_once("Agenda.php");
	
	// Create an object
	$agenda = new Agenda();
	
	// Get the parameters of the request
	$req_params = explode("/api/agenda/", $_SERVER["REQUEST_URI"]);
	
	// Now let's see what we're gonna do with our brand new shiny API
	switch($_SERVER["REQUEST_METHOD"]) {
		// Get data
		case "GET":
			// Check if there's an ID parameter present
			if (isset($id[1])) {
				// Yes, we only need to retrieve 1 item
				$result = $agenda->get($id[2]);
				break;
			}
			
			// No, return all agenda items
			$result = $agenda->getAll();
			break;
		
		// POST data
		case "POST":
			// If the first parameter is "id" then we need to update an agenda item
			// If it's something else than we need to create a new item
			if ($req_params[0] === "id") {
				$result = $agenda->update();
			}
	}
	
	// Create a JSON variant of our result
	$json = json_encode($result);
	
	// Output
	header('Content-Type: application/json');
	header('HTTP/1.1 200 OK');
	echo $json;
	return;
?>