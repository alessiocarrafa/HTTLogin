app = angular.module( 'HTTLogin_App', ['ngMaterial'] ).config(
	function( $mdThemingProvider )
	{
		$mdThemingProvider.theme('default').primaryPalette('teal').accentPalette('orange');
	}
);

app.controller( 'MainCtrl', [ '$scope', '$http', '$window', '$mdToast', function( $scope, $http, $window, $mdToast ){
	
	var enviroments = { scope : $scope, http : $http, mdToast : $mdToast, path : '' };
	enviroments.set = function( key, value )
	{
		if( enviroments.hasOwnProperty( key ) )enviroments[ key ] = value;
		return enviroments;
	};
	
	$scope.error = new Array();

	$scope.user = { username: '', password: '' };

	$scope.login = function( user )
	{
		var shaObj = new jsSHA("SHA-256", "TEXT");
		shaObj.update( user.password );
		RESTR( enviroments.set( 'path', 'login.php' ),
			{
				'username'	: user.username,
				'password'	: shaObj.getHash("HEX")
			},
			function( data )
			{
				console.log( data );
				$window.location = "home.php";
			}
		);
	};

	$scope.change_pwd = function( ed_user )
	{
		console.log( ed_user );
	};
	
}]);