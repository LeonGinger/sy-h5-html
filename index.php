<?php

	$nonce = $_GET['nonce'];
	$token = 'zousen';
	$timestamp = ['timestamp'];
	$echostr = $_GET['echostr'];
	$signature = $_GET['signature'];
	$array = array();
	$array = array($nonce, $timestamp, $token);
	sort($array);
	$str = sha1(umplode($array))
	if($str == $signature && $echostr){
		echo $echostr;
		exit;
	}else{
		$postArr = $GLOBALS['HTTP_RAW_POST_DATA'];
	}
?>