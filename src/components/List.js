// Import the React library, necessary for defining React components.
import React from "react";
// Import the Link component from react-router-dom for client-side navigation.
import { Link } from "react-router-dom";

/**
 * Represents a single album item displayed within the main albums list.
 * Shows the album's title and provides "Update" and "Delete" buttons.
 *
 * @component
 * @param {object} props - Component props passed from the parent (AlbumsList).
 * @param {object} props.album - The album object containing details (e.g., id, title, userId).
 * @param {function} props.setUpdateAlbum - Callback function invoked when the "Update" button is clicked. It passes the current album object up to the parent component to signal which album should be updated.
 * @param {function} props.deleteAlbumFromList - Callback function invoked when the "Delete" button is clicked. It passes the current album's ID up to the parent component to trigger the deletion process.
 * @returns {JSX.Element} The rendered List component for a single album.
 */
const List = (props) => {
  return (
    // Main container div for the single album item, styled with the 'list' class.
    <div className="list">
      {/* Display the album title using an h3 tag. Accesses the title from the passed 'album' prop. */}
      <h3>{props.album.title}</h3>

      {/* Container for the action buttons (Update, Delete), styled with the 'button-group' class. */}
      <div className="button-group">
        {/* The Link component makes the "Update" button navigate to the '/update-album' route when clicked. */}
        <Link to="/update-album">
          {/* The "Update" button itself. */}
          <button
            className="update-btn" // CSS class for styling the update button.
            // onClick handler: When clicked, it calls the 'setUpdateAlbum' function (passed as a prop)
            // and provides the entire 'album' object associated with this List item.
            // This typically tells the parent component which album the user wants to edit.
            onClick={() => props.setUpdateAlbum(props.album)}
          >
            Update
          </button>
        </Link>

        {/* The "Delete" button. */}
        <button
          className="delete-btn" // CSS class for styling the delete button.
          // onClick handler: When clicked, it calls the 'deleteAlbumFromList' function (passed as a prop)
          // and provides the 'id' of the album associated with this List item.
          // This signals the parent component to remove this specific album.
          onClick={() => props.deleteAlbumFromList(props.album.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

// Export the List component as the default export, making it available for import in other files (like AlbumsList.js).
export default List;
