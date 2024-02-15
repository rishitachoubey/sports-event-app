import React, { useMemo } from "react";
import { useEventsContext } from "../../contexts/eventsContext";
import { eventActionMap } from "./constants";
import { actions } from "../../reducers/Actions";
import { EventCard } from "../components/EventCard/EventCard";
import { Button } from "../components/Button/Button";
import './EventList.scss';

// Component to display selected events
export const SelectedEvents = () => {
  // Accessing selected events and dispatch function from events context
  const { selectedEvents, dispatch } = useEventsContext();

  // Memoized sorting of selected events based on start time
  const sortedEvents = useMemo(
    () => selectedEvents.sort((e1, e2) => e1.start_time - e2.start_time),
    [selectedEvents]
  );

  // Function to handle click events on each selected event card
  const handleSelectedEventClick = (e) => {
    const { eventId, action } = e.target.dataset;

    // If the action is to remove an event
    if (action === eventActionMap.REMOVE) {
      dispatch({ type: actions.DESELECT_EVENT, payload: Number(eventId) });
    }
  };

  return (
    <div className="event-list-wrapper">
      <h2 className="event-list-title">Selected Events</h2>
      {/* Display selected events list */}
      <div className="event-list" onClick={handleSelectedEventClick}>
        {sortedEvents.map((event) => (
          <EventCard key={event.id} {...event} data-testid={`event-card-${event.id}`}>
            {/* Button to remove the selected event */}
            <Button
              data-event-id={event.id}
              data-action={eventActionMap.REMOVE}
              className="custom-btn custom-btn-remove"
              data-testid={`remove-event-${event.id}`} // Added data-testid for remove button
            >
              Remove
            </Button>
          </EventCard>
        ))}
      </div>
    </div>
  );
};
