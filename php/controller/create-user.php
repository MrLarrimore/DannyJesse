<?php
//* Links to the Config and Navigation Phps
    require_once (__DIR__ . "/../model/config.php");
    
//* Filters and creates protected emails, usernames, and passwords
    $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
    $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);

//* Creates salt and gives a safety password.
    $salt = "$5$" . "rounds=5000$" . uniqid(mt_rand(), true) . "$";
    
//* Creates HashedPassword
    $hashedPassword = crypt($password, $salt);
    
//* Sets emails, passwords, and usernames.
    $query = $_SESSION["connection"]->query("INSERT INTO users SET "
             . "username = '$username',"
             . "password = '$hashedPassword',"
             . "salt = '$salt'," 
             . "exp = 0, "
             . "exp1 = 0, "
             . "exp2 = 0, "
             . "exp3 = 0, "
             . "exp4 = 0 ");
    
    $_SESSION["name"] = $username;
    
//* If $query is true, then send use to index.php.
     if ($query){
        echo ("true");
        
     }
//* If false, echo out to user an error and shpw error.
    else {
         echo "<p>" . $_SESSION["connection"]->error . "</p>";
    }