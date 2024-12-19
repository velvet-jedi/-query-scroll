import { useState, useRef, useCallback } from "react";
import usePosts from "../hooks/usePosts";
import Post from "./Post";

const ExOne = () => {
	const [pageNum, setPageNum] = useState(1);

	const { isError, isLoading, hasNextPage, results, error } =
		usePosts(pageNum);

	// const lastPostRef = useRef<HTMLElement | null>(null); //  Initially, the reference is null later on an HTMLElement

	const intObserver = useRef<IntersectionObserver | null>(null);
	const lastPostRef = useCallback((post: HTMLElement)  => { 
		if(isLoading) return

		if(intObserver.current) intObserver.current.disconnect();

		intObserver.current = new IntersectionObserver((posts) => {
			if(posts[0].isIntersecting && hasNextPage) {
				console.log('we are near the last post!')
				setPageNum(prev => prev + 1)
			}
		})

		if(post) intObserver.current.observe(post)
	}, [isLoading, hasNextPage])

	

	if (isError)
		return (
			<p className="">
				Error: {error.message || "Something went wrong!"}
			</p>
		);

	// content is a variable (not a component) in ExOne holding an array of JSX elements that represent Post components.
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




















