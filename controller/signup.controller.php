<?php

if ($_SERVER['REQUEST_METHOD'] == "POST") { //validate request method because its ajax

    include('../connection/connection.php');

    //dont check for table exist, it will confuse and slow ure code..just create table manually and run insertuser function
    //error will come when u try to insert data inside the table
    // createUserTableIfNotExist($conn);

    insertUser($conn);
} else {
    $data['status'] = 'error';
    $data['msg'] = 'not safe';
}

//dont call any function outside the request method.... i.e line 9 and 11, for security reasons
// createUserTableIfNotExist($conn); outside request method
// insertUser($conn);

function test_data($data)
{
    $data = trim($data);
    $data = stripcslashes($data);
    $data = htmlentities($data);
    return $data;
}

function createUserTableIfNotExist($conn)
{
    // sql to create table
    $sql = "CREATE TABLE users (
    user_id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(256) NOT NULL,
    last_name VARCHAR(256) NOT NULL,
    email VARCHAR(256) NOT NUll,
    password VARCHAR(256) NOT NULL,
    gender VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";

    if (mysqli_query($conn, $sql) === TRUE) {
        // ure using ajax, dont use echo
        // echo "Table users created successfully";
        //at this point, there's error if the table already exist
        $data['status'] = 'success';
        $data['msg'] = 'Table users created successfully';
    } else {
        // echo "Error creating table: " . mysqli_connect_error($connection);
        $data['status'] = 'error';
        $data['msg'] = "Error creating table: " . mysqli_connect_error($conn);
    }

    echo json_encode($data);
}

function insertUser($conn)
{
    $first_name = test_data($_POST['fname_v']);
    $last_name = test_data($_POST['lname_v']);
    $email = test_data($_POST['email_v']);
    $password = test_data($_POST['pwd_v']);
    $gender = test_data($_POST['gender_v']);

    if (!empty($first_name) && !empty($last_name)) { //check if all the required values are not empty
        if (!filter_var($_POST['email_v'], FILTER_VALIDATE_EMAIL)) {
            //again, dont use echo, its ajax...echo works but it wount show unless its in the neworks tab directly
            // echo $_POST['email'];

            $data['success'] = false;
            $data['status'] = "invalid";
            $data['message'] = "Invalid Email";

            //no need for multiple echo json_encode($data), just put it at end of function

        } else {
            $hash = password_hash($password, PASSWORD_DEFAULT);
            echo $hash;
            $query = "INSERT INTO users (first_name, last_name, email, password ,gender) VALUES ('" . mysqli_real_escape_string($conn, $first_name) . "','" . mysqli_real_escape_string($conn, $last_name) . "','" . mysqli_real_escape_string($conn, $email) . "','" . mysqli_real_escape_string($conn, $hash) . "','" . mysqli_real_escape_string($conn, $gender) . "');";
            $result = mysqli_query($conn, $query);
            echo "Result returned" . $result;
            if ($result === 0) {
                $data['success'] = false;
                $data['status'] = "invalid";
                $data['message'] = "Error while creating user";
                // echo json_encode($data);
            } else {
                $data['success'] = true;
                $data['status'] = "success";
                $data['message'] = "User created successfully";
                // echo json_encode($data);
            }
        }
    } else {
        $data['success'] = false;
        $data['status'] = "invalid";
        $data['message'] = "Error Occured";
        // echo json_encode($data);
    }

    echo json_encode($data);
}
