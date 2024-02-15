import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EventList } from '../EventList';
import { useFetchEvents } from '../useFetchEvents';
import { useEventsContext } from '../../../contexts/eventsContext'; // Import the context hook

// Mock the custom hooks
jest.mock('../useFetchEvents', () => ({
  useFetchEvents: jest.fn(),
}));
jest.mock('../../../contexts/eventsContext', () => ({ // Make sure the path is correct
  useEventsContext: jest.fn(),
}));

describe('EventList Component', () => {
  test('displays loader while events are loading', () => {
    useFetchEvents.mockReturnValue({
      isLoading: true,
    });
    useEventsContext.mockReturnValue({ // Provide mock data for the context
      events: [],
      selectedEvents: [],
      dispatch: jest.fn(),
    });

    render(<EventList />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('renders AllEvents when not loading', () => {
    useFetchEvents.mockReturnValue({
      isLoading: false,
    });
    useEventsContext.mockReturnValue({ // Provide mock data for the context
      events: [{ id: 1, name: 'Test Event' }], // Add at least one event
      selectedEvents: [],
      dispatch: jest.fn(),
    });

    render(<EventList />);
    expect(screen.getByText('All Events')).toBeInTheDocument();
    expect(screen.getByText('Selected Events')).toBeInTheDocument();
  });

  // Add more tests here as needed
});
