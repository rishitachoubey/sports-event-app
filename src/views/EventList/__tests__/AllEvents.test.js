// Import necessary utilities from React Testing Library
import React from 'react'; 
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AllEvents } from '../AllEvents'; 
import { toast } from 'react-toastify';

jest.mock('react-toastify', () => ({
    toast: {
      error: jest.fn(),
    },
  }));
  
  jest.mock('../../../contexts/eventsContext', () => ({
    useEventsContext: jest.fn(),
  }));
  
  describe('AllEvents Component', () => {
    const mockEvents = [
        { id: 1, start_time: new Date('2020-01-01T00:00:00'), event_name: 'Event 1', event_category: 'Category 1' },
        { id: 2, start_time: new Date('2020-01-02T00:00:00'), event_name: 'Event 2', event_category: 'Category 2' },
    ];
    const mockDispatch = jest.fn();
  
    beforeEach(() => {
        jest.clearAllMocks();
        require('../../../contexts/eventsContext').useEventsContext.mockImplementation(() => ({
          events: mockEvents,
          selectedEvents: [],
          dispatch: mockDispatch,
        }));
      });
  
    test('displays loader when event data is loading', () => {
      render(<AllEvents isEventLoading={true} />);
      const loaderElement = screen.getByTestId('loader'); // Ensure your Loader component has a 'data-testid="loader"'
      expect(loaderElement).toBeInTheDocument();
    });
  
    test('renders events correctly when not loading', async () => {
        render(<AllEvents isEventLoading={false} />);
        
        // Asynchronously wait for the text to appear
        const event1 = await screen.findByText('Event 1');
        const event2 = await screen.findByText('Event 2');
        expect(event1).toBeInTheDocument();
        expect(event2).toBeInTheDocument();
      });

    test('handles event selection correctly', () => {
      render(<AllEvents isEventLoading={false} />);
      const selectButtons = screen.getAllByText('Select'); // Assuming each EventCard has a "Select" button
      fireEvent.click(selectButtons[0]); // Click the select button of the first event
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SELECT_EVENT', // Replace with your actual action type
        payload: 1, // Assuming the first event has ID = 1
      });
    });
  
    test('validates maximum event selection', () => {
        // Mock the scenario where the maximum number of events are already selected
        require('../../../contexts/eventsContext').useEventsContext.mockImplementation(() => ({
          events: [
            { id: 1, start_time: new Date('2020-01-01T00:00:00'), name: 'Event 1' },
            { id: 2, start_time: new Date('2020-01-02T00:00:00'), name: 'Event 2' },
          ],
          selectedEvents: [
            { id: 1, start_time: new Date('2020-01-01T00:00:00'), name: 'Event 1' },
            { id: 2, start_time: new Date('2020-01-02T00:00:00'), name: 'Event 2' },
            { id: 3, start_time: new Date('2020-01-03T00:00:00'), name: 'Event 3' },
          ],
          dispatch: jest.fn(),
        }));
        render(<AllEvents isEventLoading={false} />);
    const selectButtons = screen.getAllByTestId(/select-event-/); // Using dynamic testId based on event ID
    fireEvent.click(selectButtons[0]); // Attempt to select another event
    expect(toast.error).toHaveBeenCalledWith("Only 3 events can be selected");
  });
});
