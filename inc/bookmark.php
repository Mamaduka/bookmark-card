<?php
/**
 * Bookmark utility functions.
 *
 * @package Mamaduka\BookmarkCard
 */

namespace Mamaduka\BookmarkCard;

use DOMDocument;
use function wp_remote_get;
use function wp_remote_retrieve_body;
use function wp_remote_retrieve_response_code;

/**
 * Tiny parser for site meta tags.
 *
 * @param string $body HTML of the site.
 * @return array $data Site meta data, if exists.
 */
function get_parsed_data( $body ) {
	$data = [
		'title'       => '',
		'description' => '',
		'image'       => '',
		'publisher'   => '',
	];

	$rules = [
		'title'       => [ 'og:title', 'twitter:title', 'twitter:text:title' ],
		'url'         => [ 'og:url', 'twitter:url' ],
		'description' => [ 'og:description', 'description' ],
		'image'       => [ 'og:image', 'og:image:url', 'twitter:image' ],
		'publisher'   => [ 'og:site_name' ],
	];

	$document = new DOMDocument();
	$document->loadHTML( $body );

	$metatags = $document->getElementsByTagName( 'meta' );

	if ( ! $metatags || $metatags->length === 0 ) {
		return $data;
	}

	// Extract data.
	foreach ( $metatags as $meta ) {

		foreach ( $rules as $name => $values ) {

			if ( $meta->hasAttribute('property')
				&& in_array( $meta->getAttribute('property'), $values, true )
				) {
					$data[ $name ] = $meta->getAttribute('content');
					continue 2;
				}

			if ( $meta->hasAttribute('name')
				&& in_array( $meta->getAttribute('name'), $values, true )
				) {
					$data[ $name ] = $meta->getAttribute('content');
					continue 2;
				}
		}
	}

	return $data;
}

/**
 * Retrieve the remote site's meta data.
 *
 * @param string $url  The site URL.
 * @return array $data Meta data array.
 */
function get_response_data( $url ) {
	$response  = wp_remote_get( $url );
	$http_code = wp_remote_retrieve_response_code( $response );

	if ( $http_code !== 200 ) {
		return [];
	}

	$body = wp_remote_retrieve_body( $response );
	$data = get_parsed_data( $body );

	return $data;
}
