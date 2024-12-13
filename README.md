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

ForwardRef is a React utility function that allows a parent component to pass ref values to a child functional component. This is useful when a parent component needs direct access to the child component's DOM, the parent needs to know that the child post comp is at the end index, so to initiate another call for getting more posts (I think)

Learning by errors

Why Do We Need to Type the Prop and Ref?

    Prop Typing (for post):

        Reason: To ensure that the Post component receives the exact data structure it expects. This prevents runtime errors and makes the component reusable and robust.

        Without typing, TypeScript treats the props as an empty object ({} by default), leading to the error:

        Without proper typing, TypeScript doesn’t know what kind of element the ref points to,

---

Key Errors and Their Fixes

    ref Handling in Post Component:
        The Post component does not explicitly define the type for ref. The ref is forwarded, but its type is incompatible with React's expected types. forwardRef is a higher-order component (HOC) provided by React.
        Fix:
            Use React.forwardRef with a properly defined type for the ref.
            Define the Post props explicitly to include the post object.

    Type Errors for Post Props:
        The Post component expects a post prop, but the TypeScript type checking doesn't recognize it because the type is missing.
        Fix:
            Define the post prop type explicitly.

    useRef Type Incompatibility:
        useRef is being initialized without specifying the type, which defaults to undefined. This causes a mismatch when React tries to assign it to the DOM element.
        Fix:
            Specify the type for useRef.

    Missing Rendered Content in ExOne:
        The content is defined but never rendered in the JSX of ExOne.
        Fix:
            Ensure content is rendered.

By attaching the ref (lastPostRef) to the last post, you gain direct access to the DOM element of that post. This allows you to monitor its position or visibility on the screen.
