/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Spinner } from '@wordpress/components';

export default function Loading() {
	return (
		<div className="wp-block-embed is-loading">
			<Spinner />
			<p>{ __( 'Loading', 'bookmark-card' ) }</p>
		</div>
	);
}
