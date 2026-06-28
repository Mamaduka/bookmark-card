/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
	Button,
	Placeholder,
	Spinner,
	PanelBody,
	ToolbarButton,
	TextControl,
	ToggleControl,
	__experimentalInputControl as InputControl,
} from '@wordpress/components';
import {
	BlockControls,
	BlockIcon,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs, getAuthority } from '@wordpress/url';
import { pencil, pullLeft, pullRight } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import bookmarkIcon from './icon';
import { STATUS, NEW_TAB_REL } from './constants';

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
		linkTarget,
		rel,
	} = attributes;

	const [fetchUrl, setFetchUrl] = useState(url);
	const [state, setState] = useState(STATUS.IDLE);

	async function onSubmit(event) {
		if (event) {
			event.preventDefault();
		}

		setState(STATUS.LOADING);

		try {
			const response = await apiFetch({
				path: addQueryArgs('/wp-block-editor/v1/url-details', {
					url: fetchUrl,
				}),
			});
			setAttributes({
				...response,
				url: fetchUrl,
				publisher: getAuthority(fetchUrl),
			});
			setState(STATUS.RESOLVED);
		} catch {
			setState(STATUS.EDITING);
		}
	}

	const isHorizontalStyle = !!className?.includes('is-style-horizontal');
	const classes = clsx({
		'is-loading': state === STATUS.LOADING,
		'is-placeholder': !title || state === STATUS.EDITING,
		'has-media-on-the-left': 'left' === mediaPosition,
	});

	const blockProps = useBlockProps({
		className: classes,
	});

	if (state === STATUS.LOADING) {
		return (
			<div {...blockProps}>
				<Spinner />
			</div>
		);
	}

	if (!title || state === STATUS.EDITING) {
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
						<InputControl
							__next40pxDefaultSize
							type="url"
							value={fetchUrl || ''}
							className="wp-block-mamaduka-bookmark-card__placeholder-input"
							label={__('Site URL', 'bookmark-card')}
							hideLabelFromVision
							placeholder={__(
								'Enter URL to embed here…',
								'bookmark-card'
							)}
							onChange={setFetchUrl}
						/>
						<Button
							__next40pxDefaultSize
							variant="primary"
							type="submit"
						>
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
					isActive={state === STATUS.EDITING}
					onClick={() => setState(STATUS.EDITING)}
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
			<InspectorControls>
				<PanelBody title={__('Link settings')}>
					<ToggleControl
						label={__('Open in new tab')}
						onChange={(value) =>
							setAttributes({
								linkTarget: value ? '_blank' : undefined,
								rel: value ? NEW_TAB_REL : undefined,
							})
						}
						checked={linkTarget === '_blank'}
					/>
					<TextControl
						__next40pxDefaultSize
						label={__('Link rel')}
						value={rel || ''}
						onChange={(newRel) => setAttributes({ rel: newRel })}
					/>
				</PanelBody>
			</InspectorControls>
			<figure {...blockProps}>
				<a
					className="bookmark-card"
					href={url}
					inert={!isSelected ? 'true' : undefined}
				>
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
		</>
	);
}
