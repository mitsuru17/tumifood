<?php

$nombre = strip_tags($_POST['nombre']);
$negocio = strip_tags($_POST['negocio']);
$telefono = strip_tags($_POST['telefono']);
$mensaje = htmlentities($_POST['mensaje']);

if ($_POST['verificacion'] != ""){
   // Es un SPAMbot
	exit();
}else{

	$subject = 'Formulario contacto | Tumifood';

	$To_Email_Adress = 'hola@tumipos.com';

	$form = "NOMBRE: "  .$nombre    ."<br>\n";
	$form .= "NEGOCIO: "  .$negocio    ."<br>\n";
	$form .= "TELEFONO: "  .$telefono    ."<br>\n";
	$form .= "MENSAJE: "  .$mensaje    ."<br>\n";

	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	$headers .= 'From: webmaster@tumipos.com';

	// Mail it
	$result = mail($To_Email_Adress, $subject, $form, $headers);

	if ($result) {
		echo 'OK';
	}else{
		echo "ERROR";
	}
}


?>