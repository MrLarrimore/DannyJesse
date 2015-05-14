<?php

//* Links config.php and navigation.php into this php.
    require_once (__DIR__ . "/../model/config.php");

    $array = array(
        'exp'=> '',
        'exp1'=> '',
        'exp2'=> '',
        'exp3'=> '',
        'exp4'=> '',

    );
    
//* Takes $username and $password and puts them into a safety filter string to protect the username & password.
    $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
    $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);

//* Connectes to $query and selects salt & password from the 'users' file, and also connect the username to the $username.
    $query = $_SESSION["connection"]->query("SELECT * FROM users WHERE BINARY username = '$username'");

//* If $query's number of rows equals 1, then $row will get fecth_array from $query.
    if ($query->num_rows == 1) {
        $row = $query->fetch_array();

        //* If the possword equals crypt's password and salt, then allow user to be authenticated and direct user to the index.php.
        if ($row["password"] == crypt($password, $row["salt"])) {
            
            $_SESSION["authenticated"] = true;
            $array["exp"] = $row["exp"];
            $array["exp1"] = $row["exp1"];
            $array["exp2"] = $row["exp2"];
            $array["exp3"] = $row["exp3"];
            $array["exp4"] = $row["exp4"];
            $_SESSION["name"] = $username;
            
            echo json_encode($array);
        //* If the password doesn't equal crypt's password and salt, then echo out 'Login invalid: Invalid username and password'.
        } else {
            echo "Login Invalid: Invalid username and password.";
        }
    }
    //* If $query's number of rows doesn't equal 1, then echo out 'Login Unsuccessful: Invalid username and password',
    else {
        echo "Login Invalid: Invalid username and password.";
    }