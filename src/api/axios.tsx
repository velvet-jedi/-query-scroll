import axios from "axios";

// axios instance
export const api = axios.create({
	baseURL: "https://jsonplaceholder.typicode.com",
});

// takes in optional options for abort signal and the pagenumber
export const getPostsPage = async (pageParam = 1, options = {}) => {
	// make a request
	const response = await api.get(`/posts?_page=${pageParam}`, options);
	return response.data;
};
