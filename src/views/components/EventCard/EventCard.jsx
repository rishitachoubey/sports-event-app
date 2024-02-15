import React from "react";
import './EventCard.scss'
import { convertDateToTime } from "../../../utils/dateUtils";

// Displays event details including name, category, and timings.
export const EventCard = ({
  id,
  children,
  event_name,
  event_category,
  start_time,
  end_time,
  isDisabled,
}) => {
  // Convert ISO string times to a readable format.
  const start = convertDateToTime(start_time);
  const end = convertDateToTime(end_time);

  return (
    <div className={`event-card-container ${isDisabled ? 'disabled' : ''}`} data-testid={`event-card-${id}`}>
      <div className="event-card-category">{event_category?.[0]}</div>
      <div className="event-card-divider" />
      <div className="event-card-content">
        {/* Add data-testid attribute to the event name div */}
        <div className="event-card-title" data-testid={`event-name-${id}`}>{event_name}</div>
        <div>({event_category})</div>
        <div>{start} - {end}</div>
        <div className="event-card-actions">{children}</div> {/* Action area */}
      </div>
    </div>
  );
};
