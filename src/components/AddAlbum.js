// Import React library and the useState hook for managing component state.
import React, { useState } from "react";
// Import the useNavigate hook from react-router-dom for programmatic navigation.
import { useNavigate } from "react-router-dom";
// Import the Navbar component for displaying the navigation bar.
import Navbar from "./Navbar";

/**
 * Renders a form page for adding a new album.
 * Uses controlled components for the input fields and includes basic validation.
 * On submission, it calls a function passed via props to add the album
 * and then navigates the user back to the homepage.
 * It also accepts theme information to pass down to the Navbar.
 *
 * @component
 * @param {object} props - Component props passed from the parent (App).
 * @param {function} props.addAlbumToList - Callback function to add the new album to App's state.
 * @param {string} props.theme - The current theme ('light' or 'dark'). Passed down to Navbar.
 * @param {function} props.toggleTheme - Function to toggle the theme in App's state. Passed down to Navbar.
 * @returns {JSX.Element} The rendered AddAlbum component.
 */
const AddAlbum = (props) => {
  // Initialize the navigate function using the useNavigate hook.
  const navigate = useNavigate();
  // Initialize state for the User ID input field, starting empty.
  const [userId, setUserId] = useState("");
  // Initialize state for the Album Title input field, starting empty.
  const [title, setTitle] = useState("");

  /**
   * Handles the submission of the add album form.
   * Performs validation, calls the parent's add function, and navigates home.
   *
   * @param {React.FormEvent<HTMLFormElement>} event - The form submission event object.
   */
  const handleAddAlbum = (event) => {
    // Prevent the default browser behavior for form submissions (which causes a full page reload).
    event.preventDefault();

    // --- Input Validation ---
    // Check if either User ID or Title fields are empty (after trimming whitespace).
    if (!userId.trim() || !title.trim()) {
      alert("Please fill in both User ID and Title.");
      return; // Stop the submission process if validation fails.
    }
    // Check if the User ID is not a valid positive number.
    if (isNaN(Number(userId)) || Number(userId) <= 0) {
      alert("Please enter a valid positive number for User ID.");
      return; // Stop the submission process if validation fails.
    }

    // --- Add Album Logic ---
    // Call the 'addAlbumToList' function passed down from the parent component (App).
    // Pass the User ID (converted to a number) and the Title.
    props.addAlbumToList(Number(userId), title);

    // --- Navigation ---
    // Programmatically navigate the user back to the homepage ('/') after successful submission.
    navigate("/");
  };

  // Render the component's UI.
  return (
    // Use React Fragment (<>) to group elements.
    <>
      {/* Render the Navbar component */}
      <Navbar
        path="/" // Link back to the Home page.
        page="Home" // Label for the navigation button.
        theme={props.theme} // Pass down the current theme.
        toggleTheme={props.toggleTheme} // Pass down the theme toggle function.
      />
      {/* Main container for the add album page content */}
      <div className="addalbum-container">
        {/* Heading for the form page */}
        <h2 className="form-heading">Add New Album</h2>
        {/* Use an HTML <form> element for semantic structure and accessibility. */}
        {/* Attach the submit handler to the form's onSubmit event. */}
        <form className="addalbum-form" onSubmit={handleAddAlbum}>
          {/* Container for the User ID input group */}
          <div className="inp-container">
            {/* Label associated with the input field using htmlFor */}
            <label htmlFor="add-userid-inp">Enter User Id:</label>
            {/* User ID input field */}
            <input
              id="add-userid-inp" // ID matching the label's htmlFor
              type="number" // Input type set to number
              value={userId} // Input value controlled by the 'userId' state
              onChange={(e) => setUserId(e.target.value)} // Update 'userId' state when the input changes
              required // HTML5 attribute indicating the field is mandatory
            />
          </div>
          {/* Container for the Album Title input group */}
          <div className="inp-container">
            {/* Label associated with the input field */}
            <label htmlFor="add-title-inp">Enter Album Title:</label>
            {/* Album Title input field */}
            <input
              id="add-title-inp" // ID matching the label's htmlFor
              type="text" // Input type set to text
              value={title} // Input value controlled by the 'title' state
              onChange={(e) => setTitle(e.target.value)} // Update 'title' state when the input changes
              required // HTML5 attribute indicating the field is mandatory
            />
          </div>
          {/* Container for the submit button */}
          <div>
            {/* Submit button within the form */}
            {/* Clicking this button will trigger the form's onSubmit event */}
            <button type="submit">Add To List</button>
          </div>
        </form>
      </div>
    </>
  );
};

// Export the AddAlbum component for use in other parts of the application (like App.js).
export default AddAlbum;
