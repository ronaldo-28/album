// Import necessary React functionalities, specifically the Component class for class-based components.
import React, { Component } from "react";
// Import routing components from react-router-dom to handle client-side navigation.
import { Routes, Route } from "react-router-dom";

// Import child components that represent different views/pages of the application.
import AddAlbum from "./AddAlbum"; // Component for the 'Add New Album' form/page.
import AlbumsList from "./AlbumsList"; // Component for displaying the list of albums (homepage).
import UpdateAlbum from "./UpdateAlbum"; // Component for the 'Update Album' form/page.

/**
 * The main root component of the application, built as a React Class Component.
 * It manages the application's core state, including the list of albums and the current theme.
 * It handles fetching data, performing CRUD (Create, Read, Update, Delete) operations on albums (simulated with JSONPlaceholder),
 * managing theme switching and persistence, and setting up the application's routes.
 *
 * @extends Component
 */
export default class App extends Component {
  /**
   * Constructor for the App component. Initializes the state.
   * @constructor
   */
  constructor() {
    super(); // Call the constructor of the parent Component class.
    // Initialize the component's state.
    this.state = {
      albums: [], // Holds the array of album objects fetched or created. Starts empty.
      updateAlbum: {}, // Holds the specific album object selected for updating. Starts as an empty object.
      // Initialize the theme state by attempting to read from localStorage.
      // If 'albumsAppTheme' exists in localStorage, use its value; otherwise, default to 'light'.
      theme: localStorage.getItem("albumsAppTheme") || "light",
    };
  }

  // --- Lifecycle Methods ---

  /**
   * Lifecycle method called once after the component mounts (is rendered into the DOM).
   * It applies the initial theme and fetches the list of albums from the API.
   * @async
   */
  componentDidMount = async () => {
    // Apply the theme ('light' or 'dark' class) to the document body based on the initial state.
    this.applyTheme();

    // Fetch the initial list of albums asynchronously.
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/albums" // API endpoint for albums.
      );
      // Check if the fetch request was successful (status code 200-299).
      if (!response.ok) {
        // If not successful, throw an error to be caught by the catch block.
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Parse the response body as JSON.
      const albums = await response.json();
      // Update the component's state with the fetched albums array.
      this.setState({ albums });
    } catch (error) {
      // Log any errors that occurred during the fetch process.
      console.error("Failed to fetch albums:", error);
      // Consider setting an error state here to display a message to the user.
    }
  };

  /**
   * Lifecycle method called after the component updates (e.g., state or props change).
   * It checks if the theme state specifically has changed and, if so, applies the
   * new theme class to the body and saves the preference to localStorage.
   *
   * @param {object} prevProps - The previous props (not used here).
   * @param {object} prevState - The previous state.
   */
  componentDidUpdate(prevProps, prevState) {
    // Compare the previous theme state with the current theme state.
    if (prevState.theme !== this.state.theme) {
      // If the theme has changed, apply the corresponding class ('dark' or remove it) to the body.
      this.applyTheme();
      // Persist the newly selected theme preference in the browser's localStorage.
      localStorage.setItem("albumsAppTheme", this.state.theme);
    }
  }

  // --- Theme Management ---

  /**
   * Toggles the 'theme' state between 'light' and 'dark'.
   * Uses the functional form of setState to ensure the update is based on the previous state.
   */
  toggleTheme = () => {
    this.setState((prevState) => ({
      // Set the theme to 'dark' if the previous theme was 'light', otherwise set it to 'light'.
      theme: prevState.theme === "light" ? "dark" : "light",
    }));
  };

  /**
   * Applies or removes the 'dark' CSS class to the document's body element
   * based on the current value of the `this.state.theme`.
   */
  applyTheme = () => {
    if (this.state.theme === "dark") {
      // If the theme is 'dark', add the 'dark' class to the body.
      document.body.classList.add("dark");
    } else {
      // If the theme is 'light', remove the 'dark' class from the body.
      document.body.classList.remove("dark");
    }
  };

  // --- Album Management Methods (CRUD Operations) ---

  /**
   * Deletes an album from the local state and simulates a DELETE request to the API.
   *
   * @param {number} id - The ID of the album to be deleted.
   */
  deleteAlbumFromList = (id) => {
    // Simulate calling the API to delete the album.
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
      method: "DELETE", // Specify the HTTP method.
    })
      // Log the response status for debugging.
      .then((response) =>
        console.log(`API DELETE for ${id} status: ${response.status}`)
      )
      // Log any errors during the API call.
      .catch((error) => console.error("API DELETE error:", error));

    // --- Local State Update ---
    // Create a new array containing all albums *except* the one with the matching ID.
    const newAlbums = this.state.albums.filter((album) => album.id !== id);
    // Display a confirmation message to the user.
    alert("Your Album Deleted successfully");
    // Update the component's state with the filtered array.
    this.setState({ albums: newAlbums });
  };

  /**
   * Sets the 'updateAlbum' state property with the album object that the user
   * intends to update. This object is then passed down to the UpdateAlbum component.
   *
   * @param {object} album - The album object selected for updating.
   */
  setUpdateAlbum = (album) => {
    this.setState({ updateAlbum: album });
  };

  /**
   * Updates an existing album in the local state and simulates a PUT request to the API.
   * Handles both existing albums (ID <= 100) and locally added albums (ID > 100).
   *
   * @async
   * @param {number} id - The ID of the album to update.
   * @param {string} updateTitle - The new title for the album.
   * @param {number} updateUserid - The new user ID for the album.
   * @param {object} oldAlbum - The original album object (used to find the index).
   */
  updateAlbumInList = async (id, updateTitle, updateUserid, oldAlbum) => {
    const albums = this.state.albums;
    // Find the index of the album to be updated using its ID for reliability.
    const index = albums.findIndex((album) => album.id === oldAlbum.id);

    // If the album wasn't found in the current state array, log an error and exit.
    if (index === -1) {
      console.error("Album to update not found in state.");
      return;
    }

    // Prepare the data payload for the API call and local state update.
    let updatedAlbumData = {
      userId: updateUserid,
      id: id,
      title: updateTitle,
    };

    try {
      // JSONPlaceholder only properly handles PUT requests for existing resource IDs (<= 100).
      if (id <= 100) {
        // Simulate updating the album via the API for existing items.
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/albums/${id}`,
          {
            method: "PUT", // Use PUT for replacement/update.
            body: JSON.stringify(updatedAlbumData), // Send updated data.
            headers: { "Content-type": "application/json; charset=UTF-8" },
          }
        );
        // Check if the API call was successful.
        if (!response.ok) {
          throw new Error(`API PUT error! status: ${response.status}`);
        }
        // If successful, use the data returned by the API (it usually returns the updated object).
        updatedAlbumData = await response.json();
      }
      // For albums added locally (id > 100), the API doesn't persist them,
      // so `updatedAlbumData` already holds the correct structure for local update.

      // --- Local State Update ---
      // Create a new albums array immutably:
      const updatedAlbums = [
        ...albums.slice(0, index), // Copy elements before the updated item.
        updatedAlbumData, // Insert the updated item data.
        ...albums.slice(index + 1), // Copy elements after the updated item.
      ];

      // Update the component's state with the new array containing the updated album.
      this.setState({ albums: updatedAlbums });
      // Notify the user.
      alert("Update Successfully done");
    } catch (error) {
      // Log errors from the API call or state update process.
      console.error("Failed to update album:", error);
      alert("Failed to update album. Check console for details.");
    }
  };

  /**
   * Adds a new album to the local state and simulates a POST request to the API.
   * Assigns a new local ID to the album.
   *
   * @param {number} userId - The user ID for the new album.
   * @param {string} title - The title for the new album.
   */
  addAlbumToList = (userId, title) => {
    // Simulate calling the API to add the new album.
    fetch("https://jsonplaceholder.typicode.com/albums", {
      method: "POST", // Use POST for creating new resources.
      body: JSON.stringify({ userId: userId, title: title }), // Send new album data.
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      // Log the response from the simulated API call (often includes a new ID like 101).
      .then((json) => console.log("API POST Response:", json))
      .catch((error) => console.error("API POST error:", error));

    // --- Local State Update Logic ---
    const length = this.state.albums.length;
    // Determine the next ID: Find the maximum current ID and add 1.
    // Default to 100 if the list is empty to avoid issues with JSONPlaceholder IDs.
    const lastId =
      length > 0 ? Math.max(...this.state.albums.map((a) => a.id)) : 100;
    const newId = lastId + 1; // Increment the highest known ID.

    // Create the new album object for the local state.
    const album = {
      userId: userId,
      id: newId, // Use the locally generated ID.
      title: title,
    };

    // Update the state immutably using the functional form of setState.
    this.setState((prevState) => ({
      albums: [...prevState.albums, album], // Append the new album to the existing array.
    }));
    // Notify the user.
    alert(`New Album (ID: ${newId}) added successfully to the bottom`);
  };

  // --- Render Method ---
  /**
   * Renders the main application structure, including the router setup.
   * Passes down state and methods as props to the relevant route components.
   * @returns {JSX.Element} The rendered application UI.
   */
  render() {
    return (
      // Set up client-side routing using <Routes> container.
      <Routes>
        {/* Define the route for the homepage ('/') */}
        <Route
          path="/"
          element={
            // Render AlbumsList component for the homepage.
            <AlbumsList
              albums={this.state.albums} // Pass album data.
              setUpdateAlbum={this.setUpdateAlbum} // Pass function to select album for update.
              deleteAlbumFromList={this.deleteAlbumFromList} // Pass function to delete an album.
              theme={this.state.theme} // Pass current theme.
              toggleTheme={this.toggleTheme} // Pass theme toggling function.
            />
          }
        />
        {/* Define the route for adding a new album ('/add-album') */}
        <Route
          path="/add-album"
          element={
            // Render AddAlbum component.
            <AddAlbum
              addAlbumToList={this.addAlbumToList} // Pass function to add an album.
              theme={this.state.theme} // Pass current theme.
              toggleTheme={this.toggleTheme} // Pass theme toggling function.
            />
          }
        />
        {/* Define the route for updating an album ('/update-album') */}
        <Route
          path="/update-album"
          element={
            // Render UpdateAlbum component.
            <UpdateAlbum
              album={this.state.updateAlbum} // Pass the album currently selected for update.
              updateAlbumInList={this.updateAlbumInList} // Pass function to perform the update.
              theme={this.state.theme} // Pass current theme.
              toggleTheme={this.toggleTheme} // Pass theme toggling function.
            />
          }
        />
      </Routes>
      // React Fragment (<> </>) is implicitly used here as the root element in render.
    );
  }
}
