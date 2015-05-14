<?php
    
//* Links config.php to this php.
    require_once (__DIR__ . "/../model/config.php");

//* Creates function authenticateUser
    function authenticateUser() {
        //* If the user isn't isset authenticated, return back false.
        if (!isset($_SESSION["authenticated"])) {
            return false;
        //* If the user is isset authenticated, then check if the user isn't true.
        } else {
            //* If the user isn't true, then return back false.
            if ($_SESSION["authenticated"] != true) {
                return false;
            //* If the user is true, then return back true.
            } else {
                return true;
            }
        }
    }
