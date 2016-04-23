<?php
	// Get the POST variables
	$name = isset($_POST['name']) ? $_POST['name'] : "";
	$email = isset($_POST['email']) ? $_POST['email'] : "";
    $address = isset($_POST['address']) ? $_POST['address'] : "";
	$amount = isset($_POST['amount']) ? $_POST['amount'] : "";
    
    // First see if a token has been send, otherwise we can consider this a faulty send attempt
    // if (!isset($_POST['token'])) {
    //     echo "Error: faulty send attempt!";
    // } else {
    //     $token = $_POST['token'];
    // }
    
	// Get an error object to sum up every error that passes through the JS validation
	$errors = [];
	
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
        
        // Set Mail Server
        ini_set("SMTP","mail.kidcalloway.nl");

        // SMTP Port.
        ini_set("smtp_port","26");
	    
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
    return;
?>