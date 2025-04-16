// Import React library and necessary hooks: useState for managing local state, useEffect for side effects.
import React, { useState, useEffect } from "react";
// Import the useNavigate hook from react-router-dom for programmatic navigation.
import { useNavigate } from "react-router-dom";
// Import the Navbar component for displaying the navigation bar.
import Navbar from "./Navbar";

/**
 * Renders a form page for updating an existing album's title and user ID.
 * It receives the album to be updated via props, displays its current details,
 * allows the user to enter new values using controlled inputs, performs basic validation,
 * calls a function passed via props to handle the actual update, and navigates
 * back to the homepage upon successful submission.
 * It also accepts theme information to pass down to the Navbar.
 *
 * @component
 * @param {object} props - Component props passed from the parent (App).
 * @param {object} props.album - The album object selected for updating (contains id, title, userId). Can be empty initially.
 * @param {function} props.updateAlbumInList - Callback function to update the album in App's state.
 * @param {string} props.theme - The current theme ('light' or 'dark'). Passed down to Navbar.
 * @param {function} props.toggleTheme - Function to toggle the theme in App's state. Passed down to Navbar.
 * @returns {JSX.Element} The rendered UpdateAlbum component.
 */
const UpdateAlbum = (props) => {
  // Initialize the navigate function using the useNavigate hook for redirection.
  const navigate = useNavigate();
  // Initialize state for the 'New Title' input field, starting empty.
  const [updateTitle, setUpdateTitle] = useState("");
  // Initialize state for the 'New User ID' input field, starting empty.
  const [updateUserid, setUpdateUserid] = useState("");

  /**
   * useEffect hook to synchronize the local state (updateTitle, updateUserid)
   * with the album data received via props whenever the props.album changes.
   * This ensures the form fields are populated correctly when the user navigates here.
   */
  useEffect(() => {
    // Check if the album prop is available (it might be empty initially).
    if (props.album) {
      // Populate the local state 'updateTitle' with the title from props.album.
      // Use empty string as fallback if props.album.title is undefined/null.
      setUpdateTitle(props.album.title || "");
      // Populate the local state 'updateUserid' with the userId from props.album.
      // Use empty string as fallback if props.album.userId is undefined/null.
      setUpdateUserid(props.album.userId || "");
    }
    // The effect depends on props.album; it re-runs only when props.album changes.
  }, [props.album]);

  /**
   * Handles the submission of the update album form.
   * Performs validation, determines final values (using original if input is empty),
   * calls the parent's update function, and navigates home.
   *
   * @param {React.FormEvent<HTMLFormElement>} event - The form submission event object.
   */
  const handleUpdateAlbum = (event) => {
    // Prevent the default browser form submission behavior (page reload).
    event.preventDefault();

    // --- Get Album ID ---
    // Safely get the ID from the album prop, defaulting to null if album isn't loaded yet.
    const id = props.album ? props.album.id : null;
    // If there's no ID (meaning no album selected or loaded), show an alert and stop.
    if (!id) {
      alert("Cannot update: No album selected.");
      return;
    }

    // --- Determine Final Values & Validate ---
    // Use the trimmed state value if the user typed something, otherwise default to the original title.
    const finalTitle =
      updateTitle.trim() === "" ? props.album.title : updateTitle.trim(); // Trim whitespace
    // Use the state value if the user typed something, otherwise default to the original userId.
    // Convert the final value to a number.
    let finalUserId =
      updateUserid === "" ? props.album.userId : Number(updateUserid);

    // Validate if the final User ID is a valid positive number.
    if (isNaN(finalUserId) || finalUserId <= 0) {
      alert("Please enter a valid positive number for User ID.");
      return; // Stop if validation fails.
    }

    // --- Call Parent Update Function ---
    // Call the 'updateAlbumInList' function passed down from the parent component (App).
    // Provide the ID, final title, final user ID, and the original album object.
    props.updateAlbumInList(id, finalTitle, finalUserId, props.album);

    // --- Navigation ---
    // Programmatically navigate the user back to the homepage ('/') after successful update logic trigger.
    navigate("/");
  };

  // --- Prepare Display Values ---
  // Safely access album properties for display, providing fallback text if album is not yet loaded.
  const currentTitle = props.album ? props.album.title : "Loading...";
  const currentUserId = props.album ? props.album.userId : "Loading...";
  const currentId = props.album ? props.album.id : null;

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
      {/* Main container for the update album page content */}
      <div className="update-album">
        {/* Heading for the form page, including the album ID */}
        <h2 className="form-heading">
          Update Album (ID: {currentId || "N/A"}){" "}
          {/* Display 'N/A' if ID is null */}
        </h2>
        {/* Use an HTML <form> element for semantic structure and accessibility */}
        {/* Attach the submit handler to the form's onSubmit event */}
        <form className="form-container" onSubmit={handleUpdateAlbum}>
          {/* Conditional rendering: Only display the form fields if an album is loaded (currentId is not null) */}
          {currentId !== null ? (
            <>
              {/* Container for the Title input group */}
              <div className="inp-container">
                {/* Label showing the current title */}
                <label htmlFor="update-title-inp">
                  Current Title: {currentTitle}
                </label>
                {/* Title input field */}
                <input
                  type="text"
                  id="update-title-inp" // ID matching the label's htmlFor (though not strictly needed here as label has text)
                  placeholder="Enter new title (optional)" // Placeholder text
                  value={updateTitle} // Input value controlled by the 'updateTitle' state
                  onChange={(e) => setUpdateTitle(e.target.value)} // Update 'updateTitle' state on change
                />
              </div>

              {/* Container for the User ID input group */}
              <div className="inp-container">
                {/* Label showing the current user ID */}
                <label htmlFor="update-userid-inp">
                  Current User Id: {currentUserId}
                </label>
                {/* User ID input field */}
                <input
                  type="number" // Input type set to number
                  id="update-userid-inp"
                  placeholder="Enter new user ID (optional)" // Placeholder text
                  value={updateUserid} // Input value controlled by the 'updateUserid' state
                  onChange={(e) => setUpdateUserid(e.target.value)} // Update 'updateUserid' state on change
                />
              </div>

              {/* Submit button for the form */}
              <button type="submit">Save Changes</button>
            </>
          ) : (
            // Display a message if the album data is not yet available or no album was selected
            <p>Loading album details or no album selected...</p>
          )}
        </form>
      </div>
    </>
  );
};

// Export the UpdateAlbum component for use in other parts of the application (like App.js).
export default UpdateAlbum;
