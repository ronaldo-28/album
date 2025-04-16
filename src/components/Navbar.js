// Import the React library, essential for creating React components.
import React from "react";
// Import the Link component from react-router-dom, used for client-side navigation between routes.
import { Link } from "react-router-dom";

/**
 * Renders the application's navigation bar.
 * It displays the application brand/logo, a theme toggle button in the center,
 * and a navigation link/button (e.g., to "Home" or "Add Album").
 * The appearance of the theme toggle button changes based on the current theme.
 *
 * @component
 * @param {object} props - Component props passed from the parent component.
 * @param {string} props.theme - The current theme state ('light' or 'dark'). Used to style the toggle button.
 * @param {function} props.toggleTheme - The function to call when the theme toggle button is clicked.
 * @param {string} props.path - The destination route path for the main navigation link/button (e.g., "/", "/add-album").
 * @param {string} props.page - The text label for the main navigation link/button (e.g., "Home", "Add Album").
 * @returns {JSX.Element} The rendered Navbar component.
 */
const Navbar = (props) => {
  // Determine the appropriate CSS class for the theme toggle button based on the current theme prop.
  // This allows styling the button differently for light and dark modes using CSS.
  const toggleButtonClass =
    props.theme === "light"
      ? "theme-toggle-button-outline-light" // Class for light mode
      : "theme-toggle-button-outline-dark"; // Class for dark mode

  // Determine the text/icon content for the theme toggle button based on the current theme prop.
  const toggleButtonContent = props.theme === "light" ? "🌙 Dark" : "☀️ Light"; // Shows the mode it will switch *to*.

  // --- CSS Styling Note ---
  // The code assumes CSS classes like 'theme-toggle-button-outline-light' and 'theme-toggle-button-outline-dark'
  // exist in a corresponding CSS file (e.g., index.css) to style the toggle button's border/color appropriately for each theme.
  // Example CSS (should be added to index.css if not already present):
  // .theme-toggle-button-outline-light { border-color: var(--theme-toggle-outline); color: var(--theme-toggle-text); }
  // .theme-toggle-button-outline-dark { border-color: var(--theme-toggle-outline); color: var(--theme-toggle-text); }

  // Render the Navbar structure using JSX.
  return (
    // Main container div for the navbar, styled by the '.navbar' CSS class.
    <div className="navbar">
      {/* Brand/Logo Section */}
      {/* An h2 element displaying the application's name, styled with nested spans. */}
      <h2>
        <span className="brand-first-half">ALBUMS</span>
        <span className="brand-last-half">LIST</span>
      </h2>

      {/* Theme Toggle Button - Placed centrally due to flexbox justify-content */}
      <button
        onClick={props.toggleTheme} // Call the toggleTheme function (passed from App) when clicked.
        // Apply base class and the dynamically determined theme-specific class.
        className={`theme-toggle-button-center ${toggleButtonClass}`}
        // Add a helpful tooltip indicating what the button does.
        title={`Switch to ${props.theme === "light" ? "Dark" : "Light"} Mode`}
      >
        {toggleButtonContent}{" "}
        {/* Display the dynamic text/icon (e.g., 🌙 Dark or ☀️ Light). */}
      </button>

      {/* Navigation Link/Button Section (e.g., Home or Add Album) */}
      {/* The Link component handles client-side navigation to the specified 'path' prop without a full page reload. */}
      <Link to={props.path}>
        {/* A standard button element inside the Link. Clicking it triggers the navigation. */}
        {/* The button's text is determined by the 'page' prop. */}
        <button>{props.page}</button>
      </Link>
    </div>
  );
};

// Export the Navbar component as the default export, making it available for import in other files.
export default Navbar;
