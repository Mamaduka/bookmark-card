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
	example: {
		attributes: {
			url: 'https://wordpress.org/',
			title: 'Blog Tool, Publishing Platform, and CMS – WordPress',
			description:
				'Open source software which you can use to easily create a beautiful website, blog, or app.',
			image: 'https://s.w.org/images/home/screen-themes.png?3',
			icon: 'https://s.w.org/favicon.ico?2',
			publisher: 'wordpress.org',
		},
	},
	attributes: {
		url: {
			type: 'string',
			default: '',
		},
		title: {
			type: 'string',
			source: 'text',
			selector: '.bookmark-card__title',
			default: '',
		},
		description: {
			type: 'string',
			source: 'text',
			selector: '.bookmark-card__description',
			default: '',
		},
		image: {
			type: 'string',
			source: 'attribute',
			selector: '.bookmark-card__image img',
			attribute: 'src',
			default: '',
		},
		icon: {
			type: 'string',
			source: 'attribute',
			selector: '.bookmark_card__meta-icon',
			attribute: 'src',
			default: '',
		},
		publisher: {
			type: 'string',
			source: 'text',
			selector: '.bookmark_card__meta-publisher',
			default: '',
		},
	},
	styles: [
		{
			name: 'default',
			label: __( 'Default', 'bookmark-card' ),
			isDefault: true,
		},
		{ name: 'horizontal', label: __( 'Horizontal', 'bookmark-card' ) },
	],
	supports: {
		html: false,
	},
	icon,
	edit: Edit,
	save,
} );
