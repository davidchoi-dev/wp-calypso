/* eslint-disable import/no-extraneous-dependencies */

/**
 * External dependencies
 */
import { debounce } from 'lodash';
import { dispatch } from '@wordpress/data';

const trackSearchTerm = ( event, target ) => {
	const context = 'inserter_menu';
	const { setSearchTerm, setSearchBlocks, setSearchBlocksNotFound } = dispatch( 'automattic/tracking' );
	const searchTerm = ( target.value || '' ).trim().toLowerCase();

	setSearchTerm( { searchTerm, context } );

	if ( searchTerm.length < 3 ) {
		return;
	}

	// Create a separate event for search with no results to make it easier to filter by them.
	const blocksNotFound = document.querySelectorAll( '.block-editor-inserter__no-results' ).length !== 0;
	setSearchBlocks( { context, notFound: blocksNotFound } );

	if ( blocksNotFound ) {
		setSearchBlocksNotFound( { context } );
	}
};

/**
 * Return the event definition object to track `wpcom_block_picker_no_results`.
 * Also, it tracks `wpcom_block_picker_no_results` is the searcher doesn't return any result.
 *
 * @returns {{handler: Function, selector: string, type: string}} event object definition.
 */
export default () => ( {
	selector: '.block-editor-inserter__search',
	type: 'keyup',
	handler: debounce( trackSearchTerm, 500 ),
} );
