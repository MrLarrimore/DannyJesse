<?php
    //* Links config.php to this php.
    require_once (__DIR__ . "/../model/config.php");

    //* Makes the user not authenticated.
    unset($_SESSION["authenticated"]);
    
    //* Destroys the session and directs the user to the index.php.
    session_destroy();
    header("Location: " . $path . "index.php");