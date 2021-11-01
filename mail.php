<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
include "vendor/autoload.php";

$utm_source = $_COOKIE['utm_source'];
$utm_medium = $_COOKIE['utm_medium'];
$utm_campaign = $_COOKIE['utm_campaign'];
$utm_content = $_COOKIE['utm_content'];
$utm_term = $_COOKIE['utm_term'];

// можно несколько адресов, через запятую

$admin_email  = ["quiz24-job@yandex.ru"];
$form_subject = trim($_POST["Тема"]);

$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';

$c = true;
$message = '';
$message2 = '';
foreach ( $_POST as $key => $value ) {
	if ( $value != ""  && $key != "admin_email" && $key != "form_subject" ) {
		if (is_array($value)) {
			$val_text = '';
			foreach ($value as $val) {
				if ($val && $val != '') {
					$val_text .= ($val_text==''?'':', ').$val;
				}
			}
			$value = $val_text;
		}
		$message2 .= "{$key}: {$value} \n";
		$message .= "
		" . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
		<td style='padding: 10px; width: auto;'><b>$key:</b></td>
		<td style='padding: 10px;width: 100%;'>$value</td>
		</tr>
		";
	}
}

// if($utm_source != ""){
// 	$message .="utm_source: {$utm_source}<br>";
// 	$message2 .="utm_source: {$utm_source}\n";
// }
// if($utm_medium != ""){
// 	$message .="utm_medium: {$utm_medium}<br>";
// 	$message2 .="utm_medium: {$utm_medium}\n";
// }
// if($utm_campaign != ""){
// 	$message .="utm_campaign: {$utm_campaign}<br>";
// 	$message2 .="utm_campaign: {$utm_campaign}\n";
// }
// if($utm_content != ""){
// 	$message .="utm_content: {$utm_content}<br>";
// 	$message2 .="utm_content: {$utm_content}\n";
// }
// if($utm_term != ""){
// 	$message .="utm_term: {$utm_term}<br>";
// 	$message2 .="utm_term: {$utm_term}\n";
// }
$message = "<table style='width: 50%;'>$message</table>";
// echo "<pre>";
// print_r($_REQUEST);
// echo "</pre>";
$phone = $_POST['Телефон'];

// От кого
$mail->setFrom('info@' . $_SERVER['HTTP_HOST'], 'Баника ');

// Кому
foreach ( $admin_email as $key => $value ) {
	$mail->addAddress($value);
}
// Тема письма
$mail->Subject = $form_subject;


// Тело письма
$body = $message;
// $mail->isHTML(true);  это если прям верстка
$mail->msgHTML($body);

// Приложения
if($_FILES){
	$uploaddir = '/uploads/';
	foreach($_FILES as $file){
		$extension = strtolower( end( explode('.', $file['name'][0]) ) );
		$deny = array(
			'phtml', 'php', 'php3', 'php4', 'php5', 'php6', 'php7', 'phps', 'cgi', 'pl', 'asp',
			'aspx', 'shtml', 'shtm', 'htaccess', 'htpasswd', 'ini', 'log', 'sh', 'js', 'html',
			'htm', 'css', 'sql', 'spl', 'scgi', 'fcgi'
		);
		if(in_array($extension, $deny)) exit(1);
		$filename_new = date("y.m.d") . '__' . date("H\-i\-s") . '.' . $extension;
		if(move_uploaded_file($file['tmp_name'][0], __DIR__.'/'.$uploaddir . $filename_new)){
			$link_file = 'https://' . $_SERVER['SERVER_NAME'] . '/uploads/' . $filename_new;
			$message .= "{$filename_new}: {$link_file}\n";
			$mail->addAttachment( __DIR__.'/'. '/uploads/' . $filename_new, $filename_new);
		}
	}
}

$mail->send();

// include 'amo.php';
return true;

?>