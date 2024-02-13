import { actions } from "./Actions";
import { addSelectedEvent, removeSelectedEvent } from "./utils";

// Reducer for handling event-related actions.
export const eventsReducer = (prevState, { type, payload }) => {
  switch (type) {
    case actions.SET_ALL_EVENTS: // Sets the initial or updated list of all events.
      return { ...prevState, events: payload };

    case actions.SELECT_EVENT: // Handles selecting an event.
      const { selectedEvents, events } = addSelectedEvent({
        events: prevState.events,
        selectedEvents: prevState.selectedEvents,
        selectedId: payload,
      });
      return { ...prevState, events, selectedEvents };

    case actions.DESELECT_EVENT: // Handles deselecting an event.
      const { selectedEvents: updatedSelectedEvents, events: updatedEvents } = removeSelectedEvent({
        events: prevState.events,
        selectedEvents: prevState.selectedEvents,
        selectedId: payload,
      });
      return { ...prevState, events: updatedEvents, selectedEvents: updatedSelectedEvents };

    default: // Returns the current state if no action matches.
      return prevState;
  }
};
