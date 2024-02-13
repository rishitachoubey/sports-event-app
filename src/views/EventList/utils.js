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
      return true;
    }
  }
};


// Additional

// // Function to filter events based on a search query
// export const getSearchedEvents = (eventList, query) => {
//   if (query) {
//     return eventList.filter((event) =>
//       event.event_name.toLowerCase().startsWith(query.toLowerCase())
//     );
//   }
//   return eventList;
// };

// // Function to get unique event categories from a list of events
// export const getEventCategories = (eventList) => {
//   const categoryMap = eventList.reduce((result, { event_category }) => {
//     if (!result[event_category]) {
//       result[event_category] = 1;
//     }
//     return result;
//   }, {});
//   return Object.keys(categoryMap);
// };

// // Function to filter events by category
// export const getFilteredCategoryEvents = (eventList, query) => {
//   if (query) {
//     return eventList.filter((event) =>
//       event.event_category.toLowerCase().includes(query.toLowerCase())
//     );
//   }
//   return eventList;
// };
