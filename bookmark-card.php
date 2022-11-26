<?php
/**
 * Plugin Name:       Bookmark Card
 * Plugin URI:        https://github.com/Mamaduka/bookmark-card
 * Description:       Turn any URL into a beautiful preview card.
 * Version:           2.1.1
 * Requires at least: 6.0
 * Requires PHP:      5.6
 * Author:            George Mamadashvili
 * Author URI:        https://mamaduka.com/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 *
 * @package Mamaduka\BookmarkCard
 */

namespace Mamaduka\BookmarkCard;

// Used for campatibility with WP 5.8.
if ( ! class_exists( 'WP_REST_URL_Details_Controller' ) ) {
	require_once __DIR__ . '/compat/class-wp-rest-url-details-controller.php';

	add_action( 'rest_api_init', function() {
		$url_details_controller = new \WP_REST_URL_Details_Controller();
		$url_details_controller->register_routes();
	} );
}

/**
 * Registers the block and required assets.
 *
 * @return void
 */
function register_block() {
	register_block_type( __DIR__ );
}
add_action( 'init', __NAMESPACE__ . '\\register_block' );
