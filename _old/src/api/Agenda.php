<?php
	class Agenda {
		private $db;
		private $error = NULL;
		
		public function __construct() {
			$dsn = 'mysql:dbname=lodybo1b_kidcalloway;host=mysql03.totaalholding.nl;port=3306';
			$username = 'lodybo1b_kidcall';
			$password = 'K1dCall0way';
			try {
			    $this->db = new PDO($dsn, $username, $password);
			    $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			    $this->db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
			} catch(PDOException $e) {
			    $this->db = 'Could not connect to the database:<br/>' . $e;
			    $this->error = true;
			}
		} // constructor
		
		/**
		*  Get all rows from database with agenda items	
		*/
		public function getAll() {
			if ($this->error) {
				return $this->db;
			}
			
			// Prepare statement and execute on database
			$statement = $this->db->prepare("SELECT * FROM agenda");
			$statement->execute();
			
			// We want OO!!
			$statement->setFetchMode(PDO::FETCH_OBJ);
			
			// Loop through every returned row and convert that into an array
			$agendaItems = [];
			$counter = 0;
			while($row = $statement->fetch()) {
				// Put the data from the database row into an the array
				$agendaItems[$counter]["date"] = $row->date;
				$agendaItems[$counter]["venue"] = $row->venue;
				$agendaItems[$counter]["address"] = $row->address;
				$agendaItems[$counter]["time"] = $row->time;
				$agendaItems[$counter]["notes"] = $row->notes;
				$agendaItems[$counter]["played"] = $row->played;
				$agendaItems[$counter]["tickets_link"] = $row->tickets_link;
				$agendaItems[$counter]["facebook_event"] = $row->facebook_event;
				
				// Increase counter
				$counter++;
			}
			
			// Return the data
			return $agendaItems;
		} // getAll
		
		/**
		* Retrieve a specific record from the database
		*/
		public function get($id) {
			if ($this->error) {
				return $this->db;
			}
			
			// Prepare statement and execute on database
			$statement = $this->db->prepare("SELECT * FROM agenda WHERE id=" . $id);
			$statement->execute();
			
			// We want OO!!
			$statement->setFetchMode(PDO::FETCH_OBJ);
			
			// Get item
			$agendaItems = [];
			
			while($row = $statement->fetch()) {
				$agendaItems["date"] = $row->date;
				$agendaItems["venue"] = $row->venue;
				$agendaItems["address"] = $row->address;
				$agendaItems["time"] = $row->time;
				$agendaItems["notes"] = $row->notes;
				$agendaItems["played"] = $row->played;
				$agendaItems["tickets_link"] = $row->tickets_link;
				$agendaItems["facebook_event"] = $row->facebook_event;
			}
			
			return $agendaItems;
		} // get
		
		public function __destruct() {
			
		} // destructor
	}
?>