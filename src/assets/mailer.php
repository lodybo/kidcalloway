<?php
	// Get the POST variables
	$name = $_POST['name'];
	$email = $_POST['email'];
    $address = $_POST['address'];
	$amount = $_POST['amount'];
    $token = $_POST['token'];
    
    // First see if a token has been send, otherwise we can consider this a faulty send attempt
    if (!$token) {
        echo "Error: faulty send attempt!";
    }
	
	// Get an error object to sum up every error that passes through the JS validation
	$errors = new array();
	
	// First test: is everything filled in?
	if (strlen($name) == 0 || strlen($email) == 0 || strlen($amount) == 0 || strlen($address) == 0)
	{
		// One of the variables is empty, so add an error parameter to our error object
		$errors[] = "Missing parameter(s)";
	}
	
	// Now check the e-mail pattern
	$regexp = "/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/";
	
	if (strlen($email) > 0)
	{	
		if (!preg_match($regexp, $email))
		{
			// Mailaddress is not correct, so add it to our eror object
			$errors[] = "Incorrect mailadres";
		}
	}
	
	// Validation checks are done, now let's see of our error object contains any errors
    // If not, echo "success", or else send back the errors
	if (count($errors) === 0)
	{
		$to = "orders@kidcalloway.nl";
	    	
    	$subject = "Bestelling 'Born Again Man' EP";
    	
    	$message = "Er is zojuist een bestelling geplaatst voor de EP 'Born Again Man': \n \n";
	    $message .= "Naam: " . $name . "\n";
	    $message .= "E-mail: " . $email . "\n";
	    $message .= "Aantal: " . $amount . "\n";
        $message .= "Adres: " . $address;
	    
	    mail($to, $subject, $message, "From: bestelformulier @ Kid Calloway <bestelformulier@KidC>");
	    
	    $response = ["status" => "success"];
        header('HTTP/1.1 200 OK');
	}
	else
	{
        $response = ["status" => "error", "errors" => $errors];
        header('HTTP/1.1 400 Bad request');
	}
    
    $json = json_encode($response);
    header('Content-Type: application/json');
    echo $json;
    result;
?>