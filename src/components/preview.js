/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Card from './card';

export default class Preview extends Component {
	constructor() {
		super( ...arguments );
		this.hideOverlay = this.hideOverlay.bind( this );
		this.state = {
			interactive: false,
		};
	}

	static getDerivedStateFromProps( nextProps, state ) {
		if ( ! nextProps.isSelected && state.interactive ) {
			return { interactive: false };
		}

		return null;
	}

	hideOverlay() {
		this.setState( { interactive: true } );
	}

	render() {
		const { bookmark } = this.props;
		const { interactive } = this.state;

		/* eslint-disable jsx-a11y/no-static-element-interactions */
		return (
			<>
				<Card bookmark={ bookmark } />
				{ ! interactive && (
					<div
						className="block-library-embed__interactive-overlay"
						onMouseUp={ this.hideOverlay }
					/>
				) }
			</>
		);
		/* eslint-enable jsx-a11y/no-static-element-interactions */
	}
}
