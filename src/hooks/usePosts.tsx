import { getPostsPage } from "../api/axios";
import { useEffect, useState } from "react";

// This type defines the structure of the data fetched from the API.
type Post = {
	id: number;
	title: string;
	body: string;
};

// Define type for error object
type ErrorState = {
	message?: string;
};

const usePosts = (page = 1) => {
	const [results, setResults] = useState<Post[]>([]);
	const [isLoading, setIsLoading] = useState<Boolean>(false);
	const [isError, setIsError] = useState<Boolean>(false);
	const [error, setError] = useState<ErrorState>({});
	const [hasNextPage, setHasNextPage] = useState<Boolean>(false);

	useEffect(() => {
		console.log("Ran");
		setIsLoading(true);
		setIsError(false);
		setError({});

		const abortController = new AbortController();
		const { signal } = abortController;

		getPostsPage(page, { signal })
			.then((data) => {
				// Avoid duplicates by filtering out already existing posts
				setResults((prev) => {
					const newPosts = data.filter(
						(post: Post) =>
							!prev.some((exists) => exists.id === post.id)
					);
					return [...prev, ...newPosts]; // Append only new posts
				});
				setHasNextPage(Boolean(data.length)); // If there is data, there could be more posts to load
				setIsLoading(false);
			})
			.catch((err) => {
				setIsLoading(false);
				if (signal.aborted) return; // Ignore if the error was due to request cancellation
				setIsError(true);
				setError({ message: err.message }); // Capture the error message
			});

		// Cleanup function to abort the request on unmount or page change
		return () => {
			abortController.abort();
		};
	}, [page]); // Re-run effect when the page changes

	return { results, isLoading, isError, error, hasNextPage };
};

export default usePosts;
