/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import {
	Button,
	Placeholder,
	Spinner,
	ToolbarButton,
} from '@wordpress/components';
import {
	BlockControls,
	BlockIcon,
	useBlockProps,
} from '@wordpress/block-editor';
import { getAuthority } from '@wordpress/url';
import { pencil, pullLeft, pullRight } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import fetchUrlData from './api';
import bookmarkIcon from './icon';
import { IDLE, EDITING, LOADING, RESOLVED } from './constants';

export default function Edit({ attributes, isSelected, setAttributes }) {
	const {
		url,
		image,
		title,
		description,
		icon,
		publisher,
		mediaPosition,
		className,
	} = attributes;

	const [fetchUrl, setFetchUrl] = useState(url);
	const [interactive, setInteractive] = useState(false);
	const [state, setState] = useState(IDLE);

	useEffect(() => {
		if (!isSelected && interactive) {
			setInteractive(false);
		}
	}, [isSelected, interactive]);

	function onSubmit(event) {
		if (event) {
			event.preventDefault();
		}

		setState(LOADING);

		fetchUrlData(fetchUrl)
			.then((response) => {
				setAttributes({
					...response,
					url: fetchUrl,
					publisher: getAuthority(fetchUrl),
				});
				setState(RESOLVED);
			})
			.catch(() => {
				setState(EDITING);
			});
	}

	const isHorizontalStyle = !!className?.includes('is-style-horizontal');
	const classes = classnames({
		'is-loading': state === LOADING,
		'is-placeholder': !title || state === EDITING,
		'has-media-on-the-left': 'left' === mediaPosition,
	});

	const blockProps = useBlockProps({
		className: classes,
	});

	if (state === LOADING) {
		return (
			<div {...blockProps}>
				<Spinner />
			</div>
		);
	}

	if (!title || state === EDITING) {
		return (
			<div {...blockProps}>
				<Placeholder
					icon={<BlockIcon icon={bookmarkIcon} />}
					label={__('Site URL', 'bookmark-card')}
					instructions={__(
						'Enter URL to convert into a bookmark card.',
						'bookmark-card'
					)}
				>
					<form onSubmit={onSubmit}>
						<input
							type="url"
							value={fetchUrl || ''}
							className="components-placeholder__input"
							aria-label={__('Site URL', 'bookmark-card')}
							placeholder={__('Enter URL here…', 'bookmark-card')}
							onChange={(event) =>
								setFetchUrl(event.target.value)
							}
						/>
						<Button isPrimary type="submit">
							{_x('Submit', 'button label', 'bookmark-card')}
						</Button>
					</form>
				</Placeholder>
			</div>
		);
	}

	return (
		<>
			<BlockControls group="block">
				<ToolbarButton
					icon={pencil}
					title={__('Edit URL', 'bookmark-card')}
					isActive={state === EDITING}
					onClick={() => setState(EDITING)}
				/>
				{isHorizontalStyle && (
					<>
						<ToolbarButton
							icon={pullLeft}
							title={__('Show media on left', 'bookmark-card')}
							isActive={mediaPosition === 'left'}
							onClick={() =>
								setAttributes({ mediaPosition: 'left' })
							}
						/>
						<ToolbarButton
							icon={pullRight}
							title={__('Show media on right', 'bookmark-card')}
							isActive={mediaPosition === 'right'}
							onClick={() =>
								setAttributes({ mediaPosition: 'right' })
							}
						/>
					</>
				)}
			</BlockControls>
			<figure {...blockProps}>
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
				{!interactive && (
					<div
						className="block-library-embed__interactive-overlay"
						onMouseUp={() => setInteractive(true)}
					/>
				)}
			</figure>
		</>
	);
}
