import { useEffect, useState } from "react";
import axios from "axios";
import { useEventsContext } from "../../contexts/eventsContext";
import { actions } from "../../reducers/Actions";
import { MOCK_EVENT_URL } from "./constants";
import { transformResponseData } from "./utils";
import { toast } from "react-toastify";

// Custom hook to fetch events data
export const useFetchEvents = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { selectedEvents, dispatch } = useEventsContext();   // State variables to track events data

  // Function to fetch all events from the mock API
  const fetchAllEvents = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await axios.get(MOCK_EVENT_URL);

      // Transform and set events data in context
      dispatch({
        type: actions.SET_ALL_EVENTS,
        payload: transformResponseData(selectedEvents, response.data),
      });
    } catch (e) {
      // Set error state and show toast message for failed request
      setIsError(true);
      toast.error("Failed to fetch events, please try again later");
    } finally {
      // Set loading to false after request completion
      setIsLoading(false);
    }
  };

  // Fetch events on component mount
  useEffect(() => {
    fetchAllEvents();
  }, []);

  return { isLoading, isError, refetch: fetchAllEvents };
};
