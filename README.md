**Explanation:**

- **`public/index.html`:** The single HTML page shell. React injects the application into the `<div id="root">`.
- **`src/index.js`:** The starting point for the React app. It sets up the React root, imports the main `App` component, and wraps it with `BrowserRouter` to enable routing.
- **`src/index.css`:** Contains all the CSS. It uses CSS variables for easy theming (light/dark modes defined here) and styles all components.
- **`src/components/`:** Holds all the React components.
  - **`App.js`:** The top-level component, acting as the brain. Manages the list of albums, the currently selected theme, handles API interactions (fetching, simulating CUD), and defines the routes using `react-router-dom`.
  - **`Navbar.js`:** A reusable component for the top navigation bar, including the theme toggle button. Receives theme state and toggle function as props.
  - **`AlbumsList.js`:** Displays the main view, rendering the Navbar and mapping over the albums data (received from `App`) to render individual `List` items.
  - **`List.js`:** Represents a single album card, displaying its title and providing "Update" and "Delete" buttons. Calls functions passed down from `App` when buttons are clicked.
  - **`AddAlbum.js`:** The form page for creating new albums. Manages local form state and calls a function from `App` to add the album to the main list.
  - **`UpdateAlbum.js`:** The form page for editing existing albums. Receives the album-to-update from `App`, manages local form state, and calls a function from `App` to update the album in the main list.

## Setup and Running Locally

**Prerequisites:**

- Node.js (includes npm) installed on your machine (LTS version recommended).

**Steps:**

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/ronaldo-28/album
    cd react-albums-app
    ```

2.  **Install Dependencies:**
    Navigate into the project directory and install the required npm packages.

    ```bash
    npm install
    ```

3.  **Start the Development Server:**
    Run the start script defined in `package.json`.
    ```bash
    npm start
    ```
    This will typically launch the application in your default web browser, usually at `http://localhost:3000`. The app will automatically reload if you make changes to the code.

## How Theming Works

The application uses CSS variables defined in `src/index.css`.

- Variables for the default (light) theme are set in the `:root` selector.
- Overrides for the dark theme are defined within the `body.dark` selector.
- The `App` component manages a `theme` state ('light' or 'dark').
- When the theme state changes (via the toggle button in the `Navbar`), the `App` component adds or removes the `.dark` class from the `<body>` element.
- CSS automatically applies the correct variable values based on the presence of the `.dark` class.
- The chosen theme is saved to `localStorage` so it persists across browser sessions.
