/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { Button, Placeholder, Spinner, ToolbarGroup } from '@wordpress/components';
import { BlockControls, BlockIcon } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Preview from './components/preview';
import fetchBookmark from './api';
import icon from './icon';

export default function Edit( {
	attributes,
	className,
	isSelected,
	setAttributes,
} ) {
	const [ url, setUrl ] = useState( attributes.url );
	const [ fetching, setFetching ] = useState( false );
	const [ editingUrl, setEditingUrl ] = useState( false );

	function onSubmit( event ) {
		if ( event ) {
			event.preventDefault();
		}

		setEditingUrl( false );
		setFetching( true );

		fetchBookmark( url )
			.then( ( response ) => {
				setAttributes( { ...response } );
				setEditingUrl( false );
				setFetching( false );
			} )
			.catch( () => {
				// @todo display notice.
				setEditingUrl( true );
				setFetching( false );
			} );
	}

	if ( fetching ) {
		return (
			<div className="wp-block-embed is-loading">
				<Spinner />
				<p>{ __( 'Loading', 'bookmark-card' ) }</p>
			</div>
		);
	}

	const showPlaceholder = ! attributes.title || editingUrl;
	if ( showPlaceholder ) {
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
						value={ url || '' }
						className="components-placeholder__input"
						aria-label={ __( 'Site URL', 'bookmark-card' ) }
						placeholder={ __( 'Enter URL here…', 'bookmark-card' ) }
						onChange={ ( event ) => setUrl( event.target.value) }
					/>
					<Button isPrimary type="submit">
						{ _x( 'Submit', 'button label', 'bookmark-card' ) }
					</Button>
				</form>
			</Placeholder>
		);
	}

	const toolbarControls = [
		{
			icon: 'edit',
			title: __( 'Edit URL', 'bookmark-card' ),
			onClick: () => setEditingUrl( true ),
		},
	];

	return (
		<>
			<BlockControls>
				<ToolbarGroup controls={ toolbarControls } />
			</BlockControls>
			<Preview
				bookmark={ attributes }
				className={ className }
				isSelected={ isSelected }
			/>
		</>
	);
}
