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
import fetchBookmark from './api';

export default class Edit extends Component {
	constructor() {
		super( ...arguments );
		this.onSubmit = this.onSubmit.bind( this );
		this.switchBackToURLInput = this.switchBackToURLInput.bind( this );

		this.state = {
			fetching: false,
			editingURL: false,
			url: this.props.attributes.url,
		};
	}

	onSubmit( event ) {
		if ( event ) {
			event.preventDefault();
		}

		const { url } = this.state;
		const { setAttributes } = this.props;

		this.setState( { editingURL: false, fetching: true } );

		fetchBookmark( url )
			.then( ( response ) => {
				setAttributes( { ...response } );
				this.setState( { editingURL: false, fetching: false } );
			} )
			.catch( () => {
				// @todo display notice.
				this.setState( { editingURL: true, fetching: false } );
			} );
	}

	switchBackToURLInput() {
		this.setState( { editingURL: true } );
	}

	render() {
		const { url, fetching, editingURL } = this.state;
		const { attributes, className, isSelected } = this.props;

		if ( fetching ) {
			return <Loading />;
		}

		const showPlaceholder = ! attributes.title || editingURL;
		if ( showPlaceholder ) {
			return (
				<Placeholder
					onSubmit={ this.onSubmit }
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
				<Preview
					bookmark={ attributes }
					className={ className }
					isSelected={ isSelected }
				/>
			</>
		);
	}
}
