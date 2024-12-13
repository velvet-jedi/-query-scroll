import { getPostsPage } from "../api/axios";
import { useEffect, useState } from "react";

// Define the Type for a Post
type Post = {
	id: number;
	title: string;
	body: string;
};

// hook to to fetch and manage the state of posts from an API

const usePosts = (page = 1) => {
	const [results, setResults] = useState<Post[]>([]);
	const [isLoading, setIsLoading] = useState<Boolean>(false);
	const [isError, setIsError] = useState<Boolean>(false);
	const [error, setError] = useState({});

	const [hasNextPage, setHasNextPage] = useState<Boolean>(false);

	useEffect(() => {
		setIsLoading(true);
		setIsError(false);
		setError({});

		const abortController = new AbortController();
		const { signal } = abortController;

		getPostsPage(page, { signal })
			.then((data) => {
				setResults((prev) => [...prev, ...data]);
				setHasNextPage(Boolean(data.length));
				setIsLoading(false);
			})
			.catch((err) => {
				setIsLoading(false);
				if (signal.aborted) return; // ignore if the error was the cancellation of the request
				setIsError(true);
				setError({ message: err.message }); // the error object will have a message property that contains the error message from the caught exception
			});

		// cleanup function abort the request on unmount
		return () => {
			abortController.abort();
		};
	}, [page]);

	return { results, isLoading, isError, error, hasNextPage };
	// allow any component that uses this hook to access and display the posts, loading state, error state, and pagination information.
};

export default usePosts;
