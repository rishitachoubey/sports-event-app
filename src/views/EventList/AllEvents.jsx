import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useEventsContext } from "../../contexts/eventsContext";
import { EventCard } from "../components/EventCard/EventCard";
import { actions } from "../../reducers/Actions";
import { Button } from "../components/Button/Button";
import { MAX_SELECTED_EVENTS, eventActionMap } from "./constants";
import {
  isEventDisabled,
} from "./utils";
import './EventList.scss'
import { Loader } from "../components/Loader/Loader";

// Component to display all events
export const AllEvents = ({ isEventLoading }) => {
  // Accessing events and selectedEvents from events context
  const { events, selectedEvents, dispatch } = useEventsContext();

  // Memoized sorting of events based on start time
  const sortedEvents = useMemo(
    () =>
      events.sort((e1, e2) => e1.start_time - e2.start_time),
    [events.length]
  );

  // Function to handle click events on each event card
  const handleEventClick = (e) => {
    const { eventId, action } = e.target.dataset;

    // Checking contraint validations
    if (action === eventActionMap.SELECT) {
      if (selectedEvents.length >= MAX_SELECTED_EVENTS) {
        return toast.error("Only 3 events can be selected");
      }
      // Dispatch action to select the event
      dispatch({ type: actions.SELECT_EVENT, payload: Number(eventId) });
    }
  };

  return (
    <div className="event-list-wrapper">
      <h2 className="event-list-title">All Events</h2>
      {/* Display loader if events are loading, otherwise render event list */}
      {isEventLoading ? (
        <div className="loader-alignment">
          <Loader />
        </div>
      ) : (
        <div className="event-list" onClick={handleEventClick}>
          {/* Map through sorted events and render event cards */}
          {sortedEvents.map((event) => {
            // Check if event is disabled (e.g., already selected)
            const isDisabled = isEventDisabled(selectedEvents, event);
            return (
              <EventCard key={event.id} {...event} isDisabled={isDisabled}>
                {/* Button to select an event */}
                <Button
                  data-event-id={event.id}
                  data-action={eventActionMap.SELECT}
                  disabled={isDisabled}
                  classname="custom-btn"
                >
                  Select
                </Button>
              </EventCard>
            );
          })}
        </div>
      )}
    </div>
  );
};
