// Function to transform response data by filtering out selected events and converting time strings to Date objects
export const transformResponseData = (selectedEvents, response) => {
  const filteredResponse = response.filter(event => 
    !selectedEvents.some(selectedEvent => selectedEvent.id === event.id)
  );

  return filteredResponse.map((event) => ({
    ...event,
    start_time: new Date(event.start_time),
    end_time: new Date(event.end_time),
  }));
};

// Function to check if an event is disabled (overlapping with selected events)
export const isEventDisabled = (selectedEvents, currentEvent) => {
  for (let i = 0; i < selectedEvents.length; i++) {
    const event = selectedEvents[i];
    if (
      event.start_time < currentEvent.end_time &&
      event.end_time > currentEvent.start_time
    ) {
      return true; // An overlap is found
    }
  }
  return false; // No overlaps are found
};