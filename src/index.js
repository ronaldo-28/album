// Import the main React library, necessary for creating components and using JSX.
import React from "react";
// Import ReactDOM, specifically the client-side rendering capabilities, particularly the 'createRoot' API for React 18+.
import ReactDOM from "react-dom/client";
// Import BrowserRouter from react-router-dom. This component provides routing capabilities for the application, enabling navigation between different "pages" or views without full page reloads. It uses the HTML5 history API.
import { BrowserRouter } from "react-router-dom";

// Import custom global CSS styles for the application. This typically includes base styles, resets, or global theming.
import "./index.css";
// Import the main application component (App). This is usually the root component that renders all other parts of the user interface.
import App from "./components/App";

/**
 * Entry point for the React application.
 * 1. Creates a React root attached to the HTML element with the ID 'root'.
 * 2. Renders the main App component, wrapped with necessary context providers (like BrowserRouter and StrictMode), into this root.
 */

// Create a React root instance targeting the HTML element with the ID 'root'.
// This element is defined in the public/index.html file and serves as the container for the entire React application.
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the application into the root container.
root.render(
  // Wrap the entire application with BrowserRouter.
  // This enables routing functionality provided by react-router-dom throughout the component tree.
  <BrowserRouter>
    {/* Wrap the App component with React.StrictMode. */}
    {/* StrictMode is a development tool that highlights potential problems in an application. */}
    {/* It activates additional checks and warnings for its descendants but does not render any visible UI */}
    {/* and does not affect the production build. */}
    <React.StrictMode>
      {/* Render the main App component. */}
      {/* All other components will be rendered as children of App, either directly or indirectly. */}
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
