<?php
//* Links database.php to this php.
    require_once (__DIR__ . "/database.php");
    //* Starts the session and regenerates the user's id.
    session_start();
    session_regenerate_id(true);
    
    //* Creates path for the Blog Project.
    $path = "/ChiSuJAwesomenauts/php/";

    //* Links the host, username, password, and database to functions in the phpMyAdmin.
    $host = "localhost";
    $username = "root";
    $password = "root";
    $database = "awesomenauts_db";
    
    
    //If the connection isn'tt set, then use $connection to create a new Database with host, username, password, and database functions.
    if (!isset($_SESSION["connection"])) {
        $connection = new Database($host, $username, $password, $database);
        $_SESSION["connection"] = $connection;
    }
