/**
 * WordPress dependencies
 */
import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Card from './card';

export default function Preview( { bookmark, className, isSelected } ) {
	const [ interactive, setInteractive ] = useState( false );

	useEffect( () => {
		if ( ! isSelected && interactive ) {
			setInteractive( false );
		}
	}, [ isSelected, interactive ] );

	/* eslint-disable jsx-a11y/no-static-element-interactions */
	return (
		<>
			<Card { ...bookmark } className={ className } />
			{ ! interactive && (
				<div
					className="block-library-embed__interactive-overlay"
					onMouseUp={ () => setInteractive( true ) }
				/>
			) }
		</>
	);
	/* eslint-enable jsx-a11y/no-static-element-interactions */
}
