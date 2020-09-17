/**
 * Internal dependencies
 */
import Card from './components/card';

export default function save( { attributes } ) {
	return <Card { ...attributes } />;
}
