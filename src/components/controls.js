/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { IconButton, Toolbar } from '@wordpress/components';
import { BlockControls } from '@wordpress/block-editor';

export default function Controls( { showEditButton, switchBackToURLInput } ) {
	return (
		<BlockControls>
			<Toolbar>
				{ showEditButton && (
					<IconButton
						className="components-toolbar__control"
						label={ __( 'Edit URL', 'bookmark-card' ) }
						icon="edit"
						onClick={ switchBackToURLInput }
					/>
				) }
			</Toolbar>
		</BlockControls>
	);
}
