/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

export default function fetchUrlData( url ) {
	return apiFetch( {
		path: addQueryArgs( '/wp-block-editor/v1/url-details', { url } ),
	} );
}
