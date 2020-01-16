<?php
include 'conn.php';
if (isset($_POST['username'])) {
    $user = $_POST['username'];
    $result = $conn->query("select * from usermessage where name='$user'");
    if ($result->fetch_assoc()) {
        echo true;
    } else {
        echo false;
    }
}
if (isset($_POST['submit'])) {
    $username = $_POST['username'];
    // $password=sha1($_POST['password']);
    $password = $_POST['password'];
    $tel = $_POST['telephpone'];
    $email = $_POST['email'];
    $conn->query("insert usermessage values(null,'$username','$password','$tel','$email',NOW()) ");
    header('location:http://10.31.152.20/wangyiyanxuan/src/login.html');
}
