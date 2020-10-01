<?php
/**
 * Register Block.
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
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	$asset_filepath = PLUGIN_DIR . '/build/index.asset.php';
	$asset_file     = file_exists( $asset_filepath ) ? include $asset_filepath : [
		'dependencies' => [],
		'version'      => false,
	];

	wp_register_script(
		'bookmark-card-block',
		plugins_url( 'build/index.js', PLUGIN_FILE ),
		$asset_file['dependencies'],
		$asset_file['version'],
		false
	);

	wp_register_style(
		'bookmark-card-style',
		plugins_url( 'build/style-index.css', PLUGIN_FILE ),
		[],
		$asset_file['version']
	);

	register_block_type(
		'mamaduka/bookmark-card',
		[
			'editor_script' => 'bookmark-card-block',
			'style'         => 'bookmark-card-style',
		]
	);
}
add_action( 'init', __NAMESPACE__ . '\\register_block' );
