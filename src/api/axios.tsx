import axios from "axios";

// axios instance
export const api = axios.create({
	baseURL: "https://jsonplaceholder.typicode.com",
});

export const getPostsPage = async (pageParam = 1, options = {}) => {
	// make a request
	const response = await api.get(`/posts?_page=${pageParam}`, options);
	return response.data;
};
