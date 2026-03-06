# Cine-Stream App:

Please read the following requirements carefully and build the application step-by-step using **React.js**, **Vite**, and **Tailwind CSS v4**. Provide all the necessary code, including component structures, hooks, and routing setup.

We will accomplish this in two phases: Core Requirements and Performance Mastery. Please start by initializing the project structure, then build out the features.

## Tech Stack

- React.js (via Vite)
- Tailwind CSS v4
- React Router (for navigation)
- TMDB API (The Movie Database)

---

## 🚀 Phase 1: Level 1 (Beginner Requirements)

The Core Application

**1. The Setup:**

- Assume I already have a free API Key from TMDB (themoviedb.org). Ensure you provide instructions on how to store this securely (e.g., using a `.env.local` file with Vite's `import.meta.env`).
- Create a dedicated `api.js` service file to handle all TMDB fetch requests.

**2. The Layout & Styling:**

- Ensure a beautiful, dark-mode Cinematic UI.
- Fetch the "Popular Movies" endpoint by default on the Home page.
- Display the fetched movies in a highly responsive CSS Grid (using Tailwind). Each movie card should beautifully display:
  - The Movie Poster image
  - Formatted Title
  - Release Year
  - Star Rating Badge overlaid on the poster

**3. The Search Bar:**

- Implement a sticky Navigation Bar at the top of the app.
- Include a sleek text-input Search Bar in the navigation.
- When the user types a movie name, the main page should dynamically clear the "Popular Movies" and instead fetch and display the results from the TMDB "Search" endpoint.

---

## ⚡ Phase 2: Level 2 (Intermediate Requirements)

Performance Mastery

_Once Phase 1 is built, implement the following advanced features:_

**1. Infinite Scroll (No Pagination Buttons):**

- Do not use traditional "Next/Previous Page" buttons.
- Instead, implement an `IntersectionObserver` within a custom React hook (e.g., `useMovies`).
- When the user scrolls to the absolute bottom of the grid, the app should automatically fetch and seamlessly append "Page 2" (and so forth) of the results to the existing grid.

**2. API Debouncing:**

- The search bar should NOT make a TMDB API fetch call for every single keystroke.
- Create a custom `useDebounce` hook. It should wait until I _stop typing_ for exactly `500ms` before it commits the search query and triggers the fetch request.

**3. Favorites List & LocalStorage:**

- Add a clickable "Heart" icon to every movie card.
- Create a custom `useFavorites` hook that manages state and syncs directly with the browser's `window.localStorage`.
- When the heart is clicked, it saves the movie object persistently to my a "My Favorites" list.
- Use `react-router-dom` to create a completely separate route (`/favorites`) with its own dedicated view to display only my locally saved favorite movies.

---

**Please begin by confirming you understand these requirements and then provide the initial setup instructions and the first batch of core files (e.g., `api.js`, `main.jsx`, `App.jsx`, and the basic routing structure).**
