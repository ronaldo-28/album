// Import the React library, necessary for creating React functional components.
import React from "react";
// Import the List component, responsible for rendering a single album item.
import List from "./List";
// Import the Navbar component, used for the application's navigation bar.
import Navbar from "./Navbar"; // Make sure Navbar is imported

/**
 * Displays the main list of albums.
 * It receives the list of albums and functions for updating/deleting albums,
 * as well as theme information, from its parent component (App).
 * It renders a Navbar at the top and then maps over the albums array to render
 * a List component for each album.
 *
 * @component
 * @param {object} props - Component props passed from the parent (App).
 * @param {Array<object>} props.albums - The array of album objects to display.
 * @param {function} props.setUpdateAlbum - Callback function to set the album to be updated in App's state.
 * @param {function} props.deleteAlbumFromList - Callback function to delete an album from App's state.
 * @param {string} props.theme - The current theme ('light' or 'dark'). Passed down to Navbar.
 * @param {function} props.toggleTheme - Function to toggle the theme in App's state. Passed down to Navbar.
 * @returns {JSX.Element} The rendered AlbumsList component.
 */
const AlbumsList = (props) => {
  return (
    // Use React Fragment (<>) to group multiple elements without adding an extra node to the DOM.
    <>
      {/* Render the Navbar component */}
      <Navbar
        page="Add Album" // Label for the navigation button/link.
        path="/add-album" // Destination path for the navigation button/link.
        theme={props.theme} // Pass the current theme down to the Navbar.
        toggleTheme={props.toggleTheme} // Pass the theme toggling function down to the Navbar.
      />

      {/* Container for the grid/list of album items */}
      <div className="albums-list">
        {/* Map over the 'albums' array passed in via props. */}
        {/* For each 'album' object in the array: */}
        {props.albums.map((album) => (
          // Render a 'List' component.
          <List
            album={album} // Pass the individual album data to the List component.
            key={album.id} // Provide a unique 'key' prop for React's list rendering optimization.
            setUpdateAlbum={props.setUpdateAlbum} // Pass down the function for selecting an album to update.
            deleteAlbumFromList={props.deleteAlbumFromList} // Pass down the function for deleting an album.
          />
        ))}
        {/* If props.albums is empty, this map will render nothing, effectively showing an empty list. */}
        {/* Consider adding a message here if the list is empty: */}
        {/* {props.albums.length === 0 && <p>No albums found.</p>} */}
      </div>
    </>
  );
};

// Export the AlbumsList component to be used in other parts of the application (like App.js).
export default AlbumsList;
