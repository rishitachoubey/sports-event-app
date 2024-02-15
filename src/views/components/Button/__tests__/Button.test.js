import React from 'react';
import '@testing-library/jest-dom'; // Import the jest-dom extension
import { render, screen, fireEvent } from '@testing-library/react'; // Import render and screen
import { Button } from '../Button'; // Import the component you're testing

describe('Button Component', () => {
  test('renders with correct text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click Me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeDisabled();
  });

  test('applies custom class name', () => {
    render(<Button className="custom-class">Click Me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toHaveClass('custom-class');
  });
});
