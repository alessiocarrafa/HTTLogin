<?php
	
	require_once( 'setup.php' );
	require_once( 'php_ext/RedBeanPHP4_3/rb.php' );
	
	R::setup( 'mysql:host=' . HOSTNAME . ';dbname=' . SCHEMATA, USERNAME, PASSWORD );
?>
<!DOCTYPE html>
<html lang="en" ng-app="HTTLogin_App">
    <head>
        <meta charset="UTF-8">
		<meta name="viewport" content="initial-scale=1" />
        <title>HTTLogin</title>
		
		<link rel="stylesheet" href="bower_components/angular-material/angular-material.min.css">
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=RobotoDraft:300,400,500,700,400italic">
		<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Russo+One:400normal">
		<link rel="stylesheet" href="css/index.css">
		
		<script src="bower_components/jquery/dist/jquery.min.js"></script>
		<script src="bower_components/angular/angular.min.js"></script>
		<script src="bower_components/angular-animate/angular-animate.min.js"></script>
		<script src="bower_components/angular-aria/angular-aria.min.js"></script>
		<script src="bower_components/angular-material/angular-material.min.js"></script>
		<script src="bower_components/jsSHA/src/sha256.js"></script>
		
		<script src="js/shared.js"></script>
		<script src="js/index.js"></script>
    </head>
    <body layout="column" ng-controller="MainCtrl" style="display:table;" ng-init="show='access';">
		
		<md-container id="login_area">
			<span>HTTLogin</span>
			<p ng-show="login_error != null;" style="color:red;">{{ login_error }}</<p>
			<form name="loginForm" ng-submit="login( user );" ng-show="show=='access';">
				<md-input-container>
					<label>Username</label>
					<input ng-model="user.username" required="required">
				</md-input-container>
				<md-input-container>
					<label>Password</label>
					<input type="password" ng-model="user.password" required="required">
				</md-input-container>
				<md-button class="md-raised md-primary">Accedi</md-button>
				<md-button class="md-raised" ng-click="show='change';">Cambia Password</md-button>
			</form>
			<form name="changeForm" ng-show="show=='change';">
				<md-input-container>
					<label>Username</label>
					<input ng-model="ed_user.username" required="required">
				</md-input-container>
				<md-input-container>
					<label>Vecchia Password</label>
					<input type="password" ng-model="ed_user.password" required="required">
				</md-input-container>
				<md-input-container>
					<label>Nuova Password</label>
					<input type="password" ng-model="ed_user.new_password" required="required">
				</md-input-container></br></br>
				<md-button class="md-raised" ng-click="change_pwd( ed_user ); show='access';">Cabia Password</md-button>
			</form>
        </md-container>
    </body>
</html>
<?php			
	/*
	$user = R::dispense( 'users' );

	$user[ "nome" ]			= "Alessio";
	$user[ "cognome" ]		= "Carrafa";
	$user[ "indirizzo" ]	= "Via Aurelia 668";

	$id = R::store( $user );

	echo( "Added with ID " . $id );
	*/
?>
