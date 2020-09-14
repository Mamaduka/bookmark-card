<?php
/**
 * Register REST API Route.
 *
 * @package Mamaduka\BookmarkCard
 */

namespace Mamaduka\BookmarkCard;

use WP_Error;
use WP_REST_Server;

/**
 * Register Bookmark Card route.
 *
 * @return void
 */
function register_route() {
	register_rest_route(
		'bookmarkCard/v1',
		'/preview',
		[
			[
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => __NAMESPACE__ . '\\get_bookmark_item',
				'permission_callback' => __NAMESPACE__ . '\\permissions_check',
				'args'                => [
					'url' => [
						'description'       => 'The URL of the resource for which to fetch meta data.',
						'type'              => 'string',
						'required'          => true,
						'sanitize_callback' => 'esc_url_raw',
					],
				],
			]
		]
	);
}
add_action( 'rest_api_init', __NAMESPACE__ . '\\register_route' );

/**
 * Checks if current user can make a proxy Fancy Links request.
 *
 * @return true|WP_Error
 */
function permissions_check() {
	if ( ! current_user_can( 'edit_posts' ) ) {
		return new WP_Error( 'rest_forbidden', 'Sorry, you are not allowed to make proxied oEmbed requests.', [ 'status' => rest_authorization_required_code() ] );
	}

	return true;
}

/**
 * Callback for Bookmark preview item.
 *
 * @param WP_REST_Request $request Full data about the request.
 * @return object|WP_Error
 */
function get_bookmark_item( $request ) {
	$url = $request['url'];

	// Serve metadata from cache.
	$cache_key = 'bookmark_' . md5( $url );
	$metadata  = get_transient( $cache_key );
	if ( ! empty( $metadata ) ) {
		return $metadata;
	}

	$metadata = get_response_data( $url );

	if ( empty( $metadata ) ) {
		return false;
	}

	set_transient( $cache_key, $metadata, DAY_IN_SECONDS );

	return $metadata;
}
