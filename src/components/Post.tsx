import React from "react";
import { forwardRef } from "react";

// This type is specific to the Post component and ensures the parent passes the expected data format.
type PostProps = {
	post: {
		id: number;
		title: string;
		body: string;
	};
};

// typescript generics
// First generic (HTMLElement): This defines the type of the DOM element that the ref will be attached to. Since we are attaching the ref to an <article> element, which is a type of HTMLElement, we specify it as the first generic. This helps TypeScript understand the type of the ref being passed down.
const Post = forwardRef<HTMLElement, PostProps>(({ post }, ref) => {
	const postBody = (
		<div className="border-0 rounded-xl bg-violet-700 p-4 m-2">
			<h2 className="text-2xl font-bold">{post.title}</h2>
			<p className="font-semibold">{post.body}</p>
			<p>Post ID: {post.id}</p>
		</div>
	);

	// if ref is passed in, only the last result of the page will receive that ref
	const content = ref ? (
		<article ref={ref}>{postBody}</article>
	) : (
		<article>{postBody}</article>
	);

	return content;
});

export default Post;
