
function getKeyByVal( obj, prop, val )
{
	for( var ass_arr in obj )
	{
        if( obj[ ass_arr ].hasOwnProperty( prop ) && obj[ ass_arr ][prop] === val )
		{
            return obj[ ass_arr ];
        }
    }
	return null;
}
function getKeysByVal( obj, prop, val )
{
	var keys = [];
	for( var ass_arr in obj )
	{
        if( obj[ ass_arr ].hasOwnProperty( prop ) && obj[ ass_arr ][prop] === val )
		{
            keys.push( obj[ ass_arr ] );
        }
    }
	return ( keys.length ? keys : null );
}

Number.prototype.toFixedComma = function( precision )
{
	return this.toFixed( precision ).toString().replace(".", ",");
}
Object.defineProperty( Number.prototype, 'fix', {
	get: function(){ return parseFloat( this ).toFixed(2); }
});
Object.defineProperty( Number.prototype, 'twodigits', {
	get: function(){ return ( this < 10 ? '0' : '' ) + this }
});
/*STABILIRE SE USARE SEMPRE MOMENT.JS O MENO*/
Object.defineProperty( Number.prototype, 'todate', {
	get: function()
	{
		var date = new Date( this * ( this > 9999999999 ? 1 : 1000 ) );
		return ( date.getDate().twodigits + '-' + ( date.getMonth() + 1 ).twodigits + '-' + date.getFullYear() );
	}
});
Object.defineProperty( Number.prototype, 'todatetime', {
	get: function()
	{
		var date = new Date( this * ( this > 9999999999 ? 1 : 1000 ) );
		return ( date.getSeconds().twodigits + ':' + date.getMinutes().twodigits + ':' + date.getHours().twodigits + ' ' + date.getDate().twodigits + '-' + ( date.getMonth() + 1 ).twodigits + '-' + date.getFullYear() );
	}
});
Object.defineProperty( String.prototype, 'totimestamp', {
	get: function()
	{
		return moment( this, "DD-MM-YYYY" ).unix();
	}
});
Object.defineProperty( String.prototype, 'upper', {
	get: function()
	{
		return this.toUpperCase();
	}
});

function RESTR( enviroments, parameters, success_callback )
{
	// enviroments = scope, http, mdToast, path
	enviroments.http.get( enviroments.path, { params: parameters } ).
	success( function( data, status, headers, config )
	{
		if( !data.error && success_callback ) success_callback( data, parameters, enviroments.scope, enviroments.http );
		else
		{
			TOAST( enviroments.mdToast, data.error_str );
		}
	}).
	error(	function( data, status, headers, config )
	{
		var message = '[ MESSAGE ]: ' + data + ' [ STATUS ]: ' + status;
		enviroments.scope.error.push( message );
		console.log( message );
	});
}

function RESTR_Promised( enviroments, parameters, callback )
{
	// enviroments = scope, http, mdToast, path
	return enviroments.http.get( enviroments.path, { params: parameters } ).
	success( function( data, status, headers, config )
	{
		if( data.error )
		{
			TOAST( enviroments.mdToast, data.error_str );
		}
		else
		{
			if( callback ) callback( data );
		}
	}).
	error(	function( data, status, headers, config )
	{
		var message = '[ MESSAGE ]: ' + data + ' [ STATUS ]: ' + status;
		enviroments.scope.error.push( message );
		console.log( message );
	}).
	then(	function( result )
	{
		//console.log('returning promised data...');
		return result.status === 200 ? result.data : null;
	});
}

function TOAST( mdToast, text )
{
	mdToast.show( mdToast.simple().content( text ).position( 'top right' ).hideDelay( 3000 ) );
}

function isNumber( o )
{
    return typeof o == "number" || ( typeof o == "object" && o.constructor === Number );
}