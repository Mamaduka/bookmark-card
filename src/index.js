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
import edit from './edit';
import save from './save';

registerBlockType('mamaduka/bookmark-card', {
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
	styles: [
		{
			name: 'default',
			label: __('Default', 'bookmark-card'),
			isDefault: true,
		},
		{ name: 'horizontal', label: __('Horizontal', 'bookmark-card') },
	],
	icon,
	edit,
	save,
});
