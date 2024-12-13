# Infinite scroll with React, Axios, and TypeScript

This project demonstrates how to fetch paginated posts from an API endpoint using `axios` in a React app with TypeScript. It includes functionality for managing loading state, error handling, and cleanup using `AbortController`.

## Key Features

-   **Axios Integration**: Fetch data from `https://jsonplaceholder.typicode.com` using an Axios instance.
-   **Pagination Support**: Load one page of results at a time from the API.
-   **AbortController for Cleanup**: Cancel the request when the component unmounts or if the request is no longer needed.
-   **TypeScript Integration**: The project includes TypeScript for improved type safety, defining a `Post` type for consistent API response handling.
-   **Error Handling**: A dedicated `error` property is used to capture and display any errors during the fetch process.
-   **Efficient State Management**: Manage multiple states, including:
    -   `results` for fetched posts.
    -   `isLoading` for tracking the loading status.
    -   `isError` for tracking errors during fetch.
    -   `hasNextPage` for determining if more results are available.
-   **Custom Hook**: The `usePosts` hook encapsulates fetching logic and state management for easy reuse in components.

## Lessons Learned

1. **UseEffect Dependency Array**:
    - The dependency array for `useEffect` can include not only state variables but also props or any other values from the component scope that the effect depends on.
2. **Abort Signal with Axios**:
    - Passing an `AbortController` signal to Axios ensures that promises are canceled when they are no longer needed, avoiding memory leaks.
3. **Error Handling with Axios**:
    - Capturing errors using `.catch` and managing the `error` state allows the app to gracefully handle API failures.
