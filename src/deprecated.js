/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

const v1 = {
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
		mediaPosition: {
			type: 'string',
			default: 'right',
		},
	},
	supports: {
		html: false,
		reusable: false,
		__experimentalBorder: {
			radius: true,
			__experimentalDefaultControls: {
				radius: true,
			},
		},
	},
	save({ attributes }) {
		const { url, image, title, description, icon, publisher } = attributes;

		return (
			<figure {...useBlockProps.save()}>
				<a className="bookmark-card" href={url}>
					{image && (
						<div className="bookmark-card__image">
							<img src={image} />
						</div>
					)}
					<div className="bookmark-card__content">
						<div className="bookmark-card__title">{title}</div>
						<div className="bookmark-card__description">
							{description}
						</div>
						<div className="bookmark_card__meta">
							{icon && (
								<img
									className="bookmark_card__meta-icon"
									src={icon}
								/>
							)}
							<span className="bookmark_card__meta-publisher">
								{publisher}
							</span>
						</div>
					</div>
				</a>
			</figure>
		);
	},
};

const deprecated = [v1];

export default deprecated;
