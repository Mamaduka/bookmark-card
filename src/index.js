/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

import './style.scss';
import './editor.scss';

/**
 * Internal dependencies
 */
import icon from './icon';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';

registerBlockType('mamaduka/bookmark-card', {
	icon,
	example: {
		attributes: {
			url: 'https://wordpress.org/',
			title: 'Blog Tool, Publishing Platform, and CMS – WordPress',
			description:
				'Open source software which you can use to easily create a beautiful website, blog, or app.',
			image: 'https://s.w.org/images/home/screen-themes.png?3',
			icon: 'https://s.w.org/favicon.ico?2',
			publisher: 'wordpress.org',
			mediaPosition: 'right',
		},
	},
	styles: [
		{
			name: 'default',
			label: __('Default', 'bookmark-card'),
			isDefault: true,
		},
		{ name: 'horizontal', label: __('Horizontal', 'bookmark-card') },
	],
	deprecated,
	edit,
	save,
});
