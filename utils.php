<?php

	function JERR( $error )
	{
		error_log( "[ JERR ] " . $error );
		return json_encode( [ "error" => 1, "error_str" => $error ] );
	}
	
	function search_single_associative( $objects, $key, $value )
	{
		foreach ( $objects as $object )
		{
			if ( isset( $object[ $key ] ) && $object[ $key ] == $value )
			{
			   return $object;
			}
		}
		return NULL;
	}
	
?>