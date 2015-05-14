<?php

//* Links config.php to this php.
    require_once (__DIR__ . "/../model/config.php");
    
//* Makes connection to $query and creates a new table 'users' to be saved to phpMyAdmin.
    $query = $_SESSION["connection"]->query("CREATE TABLE users ("
             . "id int(11) NOT NULL AUTO_INCREMENT,"
             . "username varchar(30) NOT NULL,"
             . "password char(128) NOT NULL,"
             . "salt char(128) NOT NULL,"
             . "exp int(3), "
             . "exp1 int(3), "
             . "exp2 int(3), "
             . "exp3 int(3), "
             . "exp4 int(3), "
             . "PRIMARY KEY (id))"
            );
    
    if ($query){
        
     }
//* If false, echo out to user an error and shpw error.
    else {
         echo "<p>" . $_SESSION["connection"]->error . "</p>";
    }

    