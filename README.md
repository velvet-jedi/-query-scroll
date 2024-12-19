# Infinite scroll with React, Axios, and TypeScript

This project demonstrates how to fetch paginated posts from an API endpoint using `axios` in a React app with TypeScript. It includes functionality for managing loading state, error handling, and cleanup using `AbortController`.

![alt text](image.png)

![alt text](image-1.png)

- The parent (ExOne) needs to know when the fetched set of posts (results) has the last post, for that we use ref which will get attached to the last post, we track that by using the length and index comparison 

## Key Features

-   **Axios Integration**: Fetch data from `https://jsonplaceholder.typicode.com` using an Axios instance. Is leveraged by the usePosts hook
-   **Pagination Support**: Load one page of results at a time from the API.
-   **AbortController for Cleanup**: Cancel the request when the component unmounts.
-   **TypeScript Integration**: The project includes TypeScript for improved type safety, defining a `Post` type and prop types for consistent API response handling.
-   **Error Handling**: A dedicated `error` object is used to capture and display any errors during the fetch process.
-   **Efficient State Management**: Manage multiple states, including:
    -   `results` for fetched posts.
    -   `isLoading` for tracking the loading status.
    -   `isError` for tracking errors during fetch.
    -   `hasNextPage` for determining if more results are available.
-   **Custom Hook**: The `usePosts` hook encapsulates reusable fetching logic and state management for components.

## Insights

1. **UseEffect Dependency Array**:
    - The dependency array for `useEffect` can include not only state variables but also props or any other values from the component scope that the effect depends on.
2. **Abort Signal with Axios**:
    - Passing an `AbortController` signal to Axios ensures that promises are canceled when they are no longer needed, avoiding memory leaks.
3. **Error Handling with Axios**:
    - Capturing errors using `.catch` and managing the `error` state allows the app to gracefully handle API failures.

4. **State Management Best Practices**

    - React hooks promote managing state close to where it is most relevant. Since usePosts is responsible for fetching posts, it naturally makes sense for it to own the related state (isError, isLoading, etc.).
    - This avoids "prop drilling" or managing unrelated state in the parent component, which can lead to tightly coupled and harder-to-maintain code.


# ForwardRef and Typing in React with TypeScript

## ForwardRef Overview

`ForwardRef` is a React utility function that allows a parent component to pass `ref` values to a child functional component. This is particularly useful when the parent component needs direct access to the child component's DOM. In infinite scrolling, the parent component tracks whether the child post component is at the last index to initiate another API call for fetching more posts.

### Monitoring the Last Post with Ref

By attaching a `ref` (e.g., `lastPostRef`) to the last post, you gain direct access to the DOM element of that post. This allows you to monitor its position or visibility on the screen, which is essential for implementing features like infinite scrolling.

---

## Learning Through Errors

### Why Do We Need to Type the Prop and Ref?

1. **Prop Typing (for Post Component)**:
    - **Reason**: To ensure that the `Post` component receives the exact data structure it expects. This prevents runtime errors and makes the component reusable and robust.
    - **Issue**: Without typing, TypeScript treats the props as an empty object (`{}` by default), leading to the following problems:
        - TypeScript doesn't recognize the structure of the props.
        - TypeScript doesn’t know what kind of element the `ref` points to.

---

## Key Errors and Fixes

### 1. Ref Handling in the Post Component

-   **Issue**: The `Post` component doesn't explicitly define the type for `ref`. While the `ref` is forwarded, its type is incompatible with React's expected types.
-   **Fix**:
    -   Use `React.forwardRef` with a properly defined type for the `ref`.
    -   Explicitly define the `Post` props to include the post object.

### 2. Type Errors for Post Props

-   **Issue**: The `Post` component expects a `post` prop, but TypeScript type checking doesn't recognize it because the type is missing.
-   **Fix**: Define the `post` prop type explicitly.

### 3. `useRef` Type Incompatibility

-   **Issue**: `useRef` is initialized without specifying the type, which defaults to `undefined`. This causes a mismatch when React tries to assign it to the DOM element.
-   **Fix**: Specify the type for `useRef` during initialization.


### 4. UseEffect being triggered on saving the code in ExOne file resulting in adding duplicate posts in the components.
-   **Fix**: Filter duplicates out, only fresh posts get addded to the state, use of `some`: This method checks if at least one element in the array passes the test implemented by the provided function. It returns true if such an element is found, and false otherwise.
```
const newPosts = data.filter(post => !prev.some(exists => exists.id === post.id));
return [...prev, ...newPosts];
```
- The prev state variable, often named prevState or simply prev, represents the previous state value at the time the update is enqueued. When you use the functional form of setState, React passes the previous state as an argument to your update function
