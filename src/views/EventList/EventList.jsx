import React from "react";
import { useFetchEvents } from "./useFetchEvents";
import { AllEvents } from "./AllEvents";
import { SelectedEvents } from "./SelectedEvents";
import './EventList.scss'

// Component to render the list of events
export const EventList = () => {
  // Fetching events and checking loading status
  const { isLoading } = useFetchEvents();

  return (
    <div className="event-list-container">
      {/* Display all events component with loading status */}
      <AllEvents isEventLoading={isLoading} />
      
      {/* Display selected events */}
      <SelectedEvents />
    </div>
  );
};
