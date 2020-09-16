/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Controls from './components/controls';
import Loading from './components/loading';
import Preview from './components/preview';
import Placeholder from './components/placeholder';

export default class Edit extends Component {
	constructor() {
		super( ...arguments );
		this.setUrl = this.setUrl.bind( this );
		this.switchBackToURLInput = this.switchBackToURLInput.bind( this );

		this.state = {
			fetching: false,
			editingURL: false,
			url: this.props.attributes.url,
		};
	}

	setUrl( event ) {
		if ( event ) {
			event.preventDefault();
		}

		const { url } = this.state;
		const { setAttributes } = this.props;
		this.setState( { editingURL: false, fetching: true } );
		setAttributes( { url } );
	}

	switchBackToURLInput() {
		this.setState( { editingURL: true } );
	}

	render() {
		const { url, fetching, editingURL } = this.state;
		const { attributes, isSelected } = this.props;

		if ( fetching ) {
			return <Loading />;
		}

		const showPlaceholder = ! attributes.title || editingURL;
		if ( showPlaceholder ) {
			return (
				<Placeholder
					onSubmit={ this.setUrl }
					value={ url }
					onChange={ ( event ) =>
						this.setState( { url: event.target.value } )
					}
				/>
			);
		}

		return (
			<>
				<Controls
					showEditButton={ url }
					switchBackToURLInput={ this.switchBackToURLInput }
				/>
				<Preview isSelected={ isSelected } bookmark={ attributes } />
			</>
		);
	}
}
