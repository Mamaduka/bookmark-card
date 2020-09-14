/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'mamaduka/bookmark-card', {
	title: __( 'Bookmark Card', 'bookmark-card' ),
	description: __( 'Turn any URL into a beautiful preview card.', 'bookmark-card' ),
	category: 'embed',
	keywords: [ 'bookmark', 'card' ],
	icon: 'share-alt2',
	attributes: {
		url: {
			type: 'string',
			default: '',
		},
		title: {
			type: 'string',
			default: '',
		},
		description: {
			type: 'string',
			default: '',
		},
		image: {
			type: 'string',
			default: '',
		},
		icon: {
			type: 'string',
			default: '',
		},
		publisher: {
			type: 'string',
			default: '',
		},
	},
	supports: {
		html: false
	},
	edit() {
		return <div>Bookmark Card</div>;
	},
	save() {
		return null;
	}
} );
