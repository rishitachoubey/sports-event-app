import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SelectedEvents } from '../SelectedEvents';
import { useEventsContext } from '../../../contexts/eventsContext';
import { actions } from '../../../reducers/Actions';

// Mock the context provider
jest.mock('../../../contexts/eventsContext', () => ({
  useEventsContext: jest.fn(),
}));

describe('SelectedEvents Component', () => {
  it('renders without selected events', () => {
    useEventsContext.mockReturnValue({
      selectedEvents: [],
      dispatch: jest.fn(),
    });

    render(<SelectedEvents />);
    expect(screen.getByText('Selected Events')).toBeInTheDocument();
    expect(screen.queryByText('Remove')).not.toBeInTheDocument();
  });

  it('renders with selected events', () => {
    useEventsContext.mockReturnValue({
      selectedEvents: [
        { id: 1, event_name: 'Event 1', start_time: new Date(), end_time: new Date(), event_category: 'Category 1' },
        { id: 2, event_name: 'Event 2', start_time: new Date(), end_time: new Date(), event_category: 'Category 2' },
      ],
      dispatch: jest.fn(),
    });
  
    render(<SelectedEvents />);
    // Assuming EventCard renders the event name with a test id like `event-name-${id}`
    expect(screen.getByTestId('event-name-1')).toHaveTextContent('Event 1');
    expect(screen.getByTestId('event-name-2')).toHaveTextContent('Event 2');
  });

  it('dispatches REMOVE event action when remove button is clicked', () => {
    const mockDispatch = jest.fn();
    useEventsContext.mockReturnValue({
      selectedEvents: [
        { id: 1, event_name: 'Event 1', start_time: new Date(), end_time: new Date(), event_category: 'Category 1' },
      ],
      dispatch: mockDispatch,
    });

    render(<SelectedEvents />);
    fireEvent.click(screen.getByTestId(`remove-event-1`));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: actions.DESELECT_EVENT, // Make sure this constant is defined and imported correctly
      payload: 1,
    });
  });
  it('dispatches REMOVE event action when remove button is clicked', () => {
    const mockDispatch = jest.fn();
    useEventsContext.mockReturnValue({
      selectedEvents: [
        { id: 1, event_name: 'Event 1', start_time: new Date(), end_time: new Date(), event_category: 'Category 1' },
      ],
      dispatch: mockDispatch,
    });

    render(<SelectedEvents />);
    fireEvent.click(screen.getByTestId(`remove-event-1`));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: actions.DESELECT_EVENT,
      payload: 1,
    });
  });

});
