/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

import './style.scss';

/**
 * Internal dependencies
 */
import icon from './icon';
import Edit from './edit';
import save from './save';

registerBlockType( 'mamaduka/bookmark-card', {
	title: __( 'Bookmark Card', 'bookmark-card' ),
	description: __(
		'Turn any URL into a beautiful preview card.',
		'bookmark-card'
	),
	category: 'embed',
	keywords: [ 'bookmark', 'card' ],
	icon,
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
		html: false,
	},
	edit: Edit,
	save,
} );
