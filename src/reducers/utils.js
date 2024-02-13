// Adds an event to the selected events list

export const addSelectedEvent = ({ events, selectedEvents, selectedId }) => {
  // Filters out the selected event from the main events list
  const updatedEvents = events.filter((event) => event.id !== selectedId);
  const event = events.find((event) => event.id === selectedId);
  const updatedSelectedEvents = selectedEvents.concat(event);

  return { events: updatedEvents, selectedEvents: updatedSelectedEvents };
};

// Removes an event from the selected events list

export const removeSelectedEvent = ({ events, selectedEvents, selectedId }) => {

   // Filters out the event from the selected events list
  const updatedSelectedEvents = selectedEvents.filter(
    (event) => event.id !== selectedId
  );
  const event = selectedEvents.find((event) => event.id === selectedId);
  const updatedEvents = events.concat(event);

  return { events: updatedEvents, selectedEvents: updatedSelectedEvents };
};
