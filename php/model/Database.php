<?php

//* Created new class called Database
class Database {

    //* Private and Public functions.
    private $connection;
    private $host;
    private $username;
    private $password;
    private $database;
    public $error;

    //* Function that contructs the database for the username, host, password, and database functtions.
    public function __construct($host, $username, $password, $database) {
        $this->host = $host;
        $this->username = $username;
        $this->password = $password;
        $this->database = $database;
        
    //* Takes connection function and creates a new mysqli with the host, username, and password functions.
        $this->connection = new mysqli($host, $username, $password);

    //* If the connection functioon has an error, then die and display the error.
    if($this->connection->connect_error) {
        die("<p>Error:" . $this->connection->connect_error . "</p>");
    }
    
    //* Take the connection function and gather the database from the select_db.
    $exists = $this->connection->select_db($database);
    
    //* If $exists isn't true, then query to connection to cteate a database in the $query.
    if(!$exists) {
        $query = $this->connection->query("CREATE DATABASE $database");
        
        //* If $query is true, then echo out 'Successfully created database: $database'.
        if($query) {
            echo "<p>Successfully created database:" . $database . "</p>";
        }
       
    //* If $exists is true, then echo out that 'Database already exists'.
    }else{
            echo "<p>Database already exists.</p>";  
        }
    }

    //* Creates a publis function called openConnection.
    public function openConnection() {
        //* Get connection to make a new mysqli from the user, username, password, and database functions.
        $this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);

        //* If the connectio ngets an error, then die and display error.
        if ($this->connection->connect_error) {
            die("<p>Error:" . $this->connection->connect_error . "</p>");
        }
    }

    //* Creates a publis function called closeConnection.
    public function closeConnection() {
        //* If the connection is set, then close the connection.
        if(isset($this->connection)) {
            $this->connection->close();
        }
    }

    //* Creates a public function called $string from query.
    public function query($string) {
        //* Calls upon the openConnection functioon.
        $this->openConnection();
        
        //* Makes $query connection to the $string from query.
        $query = $this->connection->query($string);
        
        //* If the $query isn't true, then call upon the error to connect the error.
        if(!$query) {
            $this->error = $this->connection->error;
        }
        
        //* Calls upon the closeConnection function.
        $this->closeConnection();
        
        //* Returns to the $query function.
        return $query;
    }

}
