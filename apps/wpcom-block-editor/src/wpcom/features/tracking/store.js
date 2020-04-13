/* eslint-disable import/no-extraneous-dependencies */
/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * WordPress dependencies
 */
import { registerStore } from '@wordpress/data';

const reducer = ( state = {}, { type, searchTerm, context = 'unknown', notFound } ) => {
	switch ( type ) {
		case 'SET_SEARCH_TERM':
			return {
				...state,
				searcher: {
					[ context ]: {
						...( state.searcher ? state.searcher[ context ] : {} ),
						searchTerm,
					},
				},
			};

		case 'SET_SEARCH_BLOCKS':
			return {
				...state,
				searcher: { [ context ]: { ...state.searcher[ context ], notFound } },
			};

		case 'SET_SEARCH_BLOCKS_NOT_FOUND':
			return {
				...state,
				searcher: { [ context ]: { ...state.searcher[ context ], notFound: true } },
			};
	}

	return state;
};

const actions = {
	setSearchTerm: ( { searchTerm, context } ) => ( {
		type: 'SET_SEARCH_TERM',
		searchTerm,
		context,
	} ),

	setSearchBlocks: ( { context, notFound } ) => ( {
		type: 'SET_SEARCH_BLOCKS',
		context,
		notFound,
	} ),

	setSearchBlocksNotFound: ( { context } ) => ( {
		type: 'SET_SEARCH_BLOCKS_NOT_FOUND',
		context,
	} ),
};

const selectors = {
	getSearchTerm: ( state, { context } ) => get( state, [ 'searcher', context, 'searchTerm' ] ),
};

registerStore( 'automattic/tracking', {
	reducer,
	actions,
	selectors,
} );