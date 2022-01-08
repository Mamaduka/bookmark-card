<?php
/**
 * Plugin Name:       Bookmark Card
 * Plugin URI:        https://github.com/Mamaduka/bookmark-card
 * Description:       Turn any URL into a beautiful preview card.
 * Version:           1.0.0
 * Requires at least: 5.8
 * Requires PHP:      5.6
 * Author:            George Mamadashvili
 * Author URI:        https://mamaduka.com/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 *
 * @package Mamaduka\BookmarkCard
 */

namespace Mamaduka\BookmarkCard;

const PLUGIN_DIR  = __DIR__;
const PLUGIN_FILE = __FILE__;

require_once PLUGIN_DIR . '/inc/bookmark.php';
require_once PLUGIN_DIR . '/inc/rest-route.php';

/**
 * Registers the block and required assets.
 *
 * @return void
 */
function register_block() {
	register_block_type( __DIR__ );
}
add_action( 'init', __NAMESPACE__ . '\\register_block' );
