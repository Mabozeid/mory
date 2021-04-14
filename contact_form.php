<?php

$mail_to = "m.abozeidr07@Gmail.com";  // replace it with your email

$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

date_default_timezone_set("Africa/Cairo");  // replace it with your timezone

$body = "------------------------------------------------------------------" . "\n\n";
$body .= "New Message From: " . "$name " . "<$email>" . "\n\n";
$body .= "------------------------------------------------------------------" . "\n\n";
$body .= "Name: " . "$name" . "\n\n";
$body .= "Email: " . "$email" . "\n\n";
$body .= "Message: " . "\n\n" . "$message" . "\n\n";
$body .= "------------------------------------------------------------------" . "\n\n";
$body .= "Date: " . date("l, j F, Y") . " at " . date("h:i A");

$from = "From: " . "$name " . "<$email>";

if (mail($mail_to, $subject, $body, $from)) {
    $data['error'] = 0;
} else {
    $data['error'] = 1;
}
echo $data['error'];
