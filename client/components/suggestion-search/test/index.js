/**
 * External dependencies
 */
import React from 'react';
import { shallow } from 'enzyme';

/**
 * Internal dependencies
 */
import SuggestionSearch from '..';
import { tracks } from 'lib/analytics';

jest.mock( 'lib/analytics', () => ( {
	tracks: {
		recordEvent: jest.fn(),
	},
} ) );

describe( 'SuggestionSearch', () => {
	beforeEach( () => {
		tracks.recordEvent.mockReset();
	} );

	test( 'rendering fires traintracks render events', () => {
		const suggestions = [ { label: 'My Label', value: 'My Value' } ];
		const wrapper = shallow(
			<SuggestionSearch
				suggestions={ suggestions }
				railcar={ {
					id: 'RAILCAR-ID',
					fetch_algo: 'THE_FETCH_ALGO',
					action: 'THE_ACTION',
					ui_algo: 'THE_UI_ALGO',
				} }
			/>
		);

		wrapper.instance().onSuggestionItemMount( { index: 0, suggestionIndex: 0 } );
		expect( tracks.recordEvent ).toHaveBeenCalledWith( 'calypso_traintracks_render', {
			fetch_algo: 'THE_FETCH_ALGO',
			fetch_position: 0,
			railcar: 'RAILCAR-ID-0',
			ui_algo: 'THE_UI_ALGO',
			ui_position: 0,
		} );
	} );

	test( 'rendering fires traintracks mousedown events', () => {
		const suggestions = [ { label: 'My Label', value: 'My Value' } ];
		const wrapper = shallow(
			<SuggestionSearch
				suggestions={ suggestions }
				railcar={ {
					id: 'RAILCAR-ID',
					fetch_algo: 'THE_FETCH_ALGO',
					action: 'THE_ACTION',
					ui_algo: 'THE_UI_ALGO',
				} }
			/>
		);

		wrapper.instance().handleSuggestionMouseDown( suggestions[ 0 ], 0 );
		expect( tracks.recordEvent ).toHaveBeenCalledWith( 'calypso_traintracks_interact', {
			action: 'THE_ACTION',
			railcar: 'RAILCAR-ID-0',
		} );
	} );
} );