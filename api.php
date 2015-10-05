<?php

	require __DIR__		. '/vendor/autoload.php';

	$app = new \Slim\Slim();

	$app->get( '/login.php', function() use ( $app )
	{
		$usr = $app->request->params('username');
		$pwd = $app->request->params('password');
		
		$result = [ 'username' => $usr , 'password' => $pwd ];

		echo( $result ? json_encode( $result ) : JERR( "Utente non trovato nel DataBase" ) );
	});

?>