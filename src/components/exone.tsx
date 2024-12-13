import { useState, useRef } from "react";
import usePosts from "../hooks/usePosts";
import Post from "./Post";

const ExOne = () => {
	const [pageNum, setPageNum] = useState(1);

	const { isError, isLoading, hasNextPage, results, error } =
		usePosts(pageNum);

	const lastPostRef = useRef<HTMLElement | null>(null); //  Initially, the reference is null later on an HTMLElement

	if (isError)
		return (
			<p className="">
				Error: {error.message || "Something went wrong!"}
			</p>
		);

	const content = results.map((post, index) => {
		if (index + 1 === results.length) {
			return (
				<Post
					key={post.id}
					post={post}
					ref={lastPostRef} // forwarding the ref to the Post component and assigning the ref to the last Post component
				/>
			);
		}
		return (
			<Post
				key={post.id}
				post={post}
			/>
		);
	});

	return (
		<>
			<h1 id="#top">Example 1</h1>

			<div className="">{content}</div>
			{isLoading && <p>Loading more content...</p>}
			<p className="">
				<a href="#top">Back to top</a>
			</p>
		</>
	);
};

export default ExOne;
