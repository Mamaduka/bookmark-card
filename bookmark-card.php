<?php
/**
 * Plugin Name:       Bookmark Card
 * Plugin URI:        https://github.com/Mamaduka/bookmark-card
 * Description:       Turn any URL into a beautiful preview card.
 * Version:           2.2
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

/**
 * Registers the block and required assets.
 *
 * @return void
 */
function register_block() {
	register_block_type( __DIR__ );
}
add_action( 'init', __NAMESPACE__ . '\\register_block' );
