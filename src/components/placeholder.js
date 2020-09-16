/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { Button, Placeholder } from '@wordpress/components';
import { BlockIcon } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import icon from '../icon';

export default function BookmarkPlaceholder( { value, onSubmit, onChange } ) {
	return (
		<Placeholder
			icon={ <BlockIcon icon={ icon } /> }
			label={ __( 'Site URL', 'bookmark-card' ) }
			className="wp-block-embed"
			instructions={ __(
				'Enter URL to convert into a bookmark card.',
				'bookmark-card'
			) }
		>
			<form onSubmit={ onSubmit }>
				<input
					type="url"
					value={ value || '' }
					className="components-placeholder__input"
					aria-label={ __( 'Site URL', 'bookmark-card' ) }
					placeholder={ __( 'Enter URL here…', 'bookmark-card' ) }
					onChange={ onChange }
				/>
				<Button isPrimary type="submit">
					{ _x( 'Submit', 'button label', 'bookmark-card' ) }
				</Button>
			</form>
		</Placeholder>
	);
}
