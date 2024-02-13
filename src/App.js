import { ToastContainer } from "react-toastify";
import { EventList } from "./views/EventList/EventList";

import "react-toastify/dist/ReactToastify.min.css";

// Main component of the application
function App() {
  return (
    <>
      {/* Toast container to display notifications */}
      <ToastContainer
        position="top-right"    
        autoClose={3000}        
        theme="colored"        
        role="alert"             
        closeOnClick   
      />
      <EventList />
    </>
  );
}

export default App;
