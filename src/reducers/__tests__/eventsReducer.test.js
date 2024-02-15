import { actions } from '../Actions';
import { eventsReducer } from '../eventsReducer';
import { addSelectedEvent, removeSelectedEvent } from '../utils';

// Mock the utility functions used in the reducer
jest.mock('../utils', () => ({
  addSelectedEvent: jest.fn(),
  removeSelectedEvent: jest.fn(),
}));

describe('eventsReducer', () => {
  const initialState = {
    events: [],
    selectedEvents: [],
  };

  it('should handle SET_ALL_EVENTS action', () => {
    const mockEvents = [{ id: 1, name: 'Event 1' }];
    const action = { type: actions.SET_ALL_EVENTS, payload: mockEvents };
    const newState = eventsReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, events: mockEvents });
  });

  it('should handle SELECT_EVENT action', () => {
    const action = { type: actions.SELECT_EVENT, payload: 1 };
    addSelectedEvent.mockReturnValue({
      selectedEvents: [{ id: 1, name: 'Event 1' }],
      events: [],
    });
    const newState = eventsReducer(initialState, action);
    expect(addSelectedEvent).toHaveBeenCalledWith({
      events: initialState.events,
      selectedEvents: initialState.selectedEvents,
      selectedId: action.payload,
    });
    expect(newState).toEqual({ ...initialState, selectedEvents: [{ id: 1, name: 'Event 1' }], events: [] });
  });

  it('should handle DESELECT_EVENT action', () => {
    const action = { type: actions.DESELECT_EVENT, payload: 1 };
    removeSelectedEvent.mockReturnValue({
      selectedEvents: [],
      events: [{ id: 1, name: 'Event 1' }],
    });
    const newState = eventsReducer(initialState, action);
    expect(removeSelectedEvent).toHaveBeenCalledWith({
      events: initialState.events,
      selectedEvents: initialState.selectedEvents,
      selectedId: action.payload,
    });
    expect(newState).toEqual({ ...initialState, selectedEvents: [], events: [{ id: 1, name: 'Event 1' }] });
  });

  it('should return the current state if the action does not match', () => {
    const action = { type: 'UNKNOWN_ACTION', payload: null };
    const newState = eventsReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
