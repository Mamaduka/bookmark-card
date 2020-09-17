/**
 * WordPress dependencies
 */
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';

export default function fetchBookmark( url ) {
	return apiFetch( {
		path: addQueryArgs( 'bookmark-card/v1/proxy', { url } ),
	} );
}
