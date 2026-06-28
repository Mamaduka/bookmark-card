/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		url,
		image,
		title,
		description,
		icon,
		publisher,
		linkTarget,
		rel,
		mediaPosition,
	} = attributes;

	const className = clsx({
		'has-media-on-the-left': 'left' === mediaPosition,
	});

	return (
		<figure {...useBlockProps.save({ className })}>
			<a
				className="bookmark-card"
				href={url}
				target={linkTarget}
				rel={rel}
			>
				{image && (
					<div className="bookmark-card__image">
						<img src={image} alt={title} />
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
								alt=""
								role="presentation"
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
}
