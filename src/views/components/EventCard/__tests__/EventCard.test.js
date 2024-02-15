import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import the necessary extensions
import { EventCard } from '../EventCard'; // Adjust the import path if necessary

// Mock event data
const event = {
  id: 1,
  event_name: 'Sample Event',
  event_category: 'Sample Category',
  start_time: '2024-02-14T13:30:00',
  end_time: '2024-02-14T15:30:00',
};

describe('EventCard Component', () => {
  test('renders event details correctly', () => {
    render(<EventCard {...event} />);
    expect(screen.getByText('Sample Event')).toBeInTheDocument();
    // Update the following line to use a regular expression to match text with optional spaces and line breaks
    expect(screen.getByText(/Sample\s+Category/)).toBeInTheDocument();
    expect(screen.getByText('1:30 PM - 3:30 PM')).toBeInTheDocument();
  });

  test('renders with children components', () => {
    const MockChildComponent = () => <div data-testid="mock-child">Mock Child</div>;
    render(
      <EventCard {...event}>
        <MockChildComponent />
      </EventCard>
    );
    expect(screen.getByTestId('mock-child')).toBeInTheDocument();
  });
  test('renders without children components', () => {
    render(<EventCard {...event} />);
    const childComponent = screen.queryByTestId('mock-child'); // Ensure no child component is rendered
    expect(childComponent).toBeNull();
  });
  test('applies "disabled" class when isDisabled prop is true', () => {
    render(<EventCard {...event} isDisabled={true} />);
    const eventCardContainer = screen.getByTestId(`event-card-${event.id}`);
    expect(eventCardContainer).toHaveClass('disabled');
  });

  test('does not apply "disabled" class when isDisabled prop is false', () => {
    render(<EventCard {...event} isDisabled={false} />);
    const eventCardContainer = screen.getByTestId(`event-card-${event.id}`);
    expect(eventCardContainer).not.toHaveClass('disabled');
  });
 
});
