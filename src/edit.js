/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Controls from './components/controls';
import Loading from './components/loading';
import Preview from './components/preview';
import Placeholder from './components/placeholder';
import fetchBookmark from './api';

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
		return <Loading />;
	}

	const showPlaceholder = ! attributes.title || editingUrl;
	if ( showPlaceholder ) {
		return (
			<Placeholder
				onSubmit={ onSubmit }
				value={ url }
				onChange={ ( event ) => setUrl( event.target.value ) }
			/>
		);
	}

	return (
		<>
			<Controls
				showEditButton={ url }
				switchBackToURLInput={ () => setEditingUrl( true ) }
			/>
			<Preview
				bookmark={ attributes }
				className={ className }
				isSelected={ isSelected }
			/>
		</>
	);
}
