import { createContext, useContext, useMemo, useReducer, useEffect} from "react";
import { eventsReducer } from "../reducers/eventsReducer";
import { initialState } from "./initialState";

// Create context for events
export const EventsContext = createContext();

// Custom hook to use events context
export const useEventsContext = () => {
  return useContext(EventsContext);
};

// Key for local storage
const LOCAL_STORAGE_KEY = "selectedEvents";

// Provider component for events context
export const EventsProvider = ({ children }) => {
  // Attempt to load initial state from localStorage
  const savedState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || initialState;
  const [state, dispatch] = useReducer(eventsReducer, savedState);

  // Update localStorage when selectedEvents changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Memoize state to prevent unnecessary renders
  const { state: memoizedState } = useMemo(() => ({ state }), [state]);

  return (
    // Provide state and dispatch to children through context
    <EventsContext.Provider value={{ ...memoizedState, dispatch }}>
      {children}
    </EventsContext.Provider>
  );
};
