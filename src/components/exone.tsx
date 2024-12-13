import React from "react";
import { useState } from "react";
import usePosts from "../hooks/usePosts";

const exone = () => {
	const [pageNum, setPageNum] = useState(1);

	const { isError, isLoading, hasNextPage, results, error } =
		usePosts(pageNum);

	if (isError) return <p className="">Error: {error.message}</p>;

	return (
		<>
			<h1 id="#top">Example 1</h1>

			{isLoading && <p>Loading more content...</p>}
			<p className="">
				<a href="#top">Back to top</a>
			</p>
		</>
	);
};

export default exone;
