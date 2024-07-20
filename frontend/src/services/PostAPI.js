import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

class PostAPI {
	createPost = async (subredditName, post) => {
		try {
			const { data } = await axiosInstance.post(
				`subreddits/${subredditName}/posts`,
				post
			);
			console.log('subredditName', subredditName);
			console.log('post', post);
			return data;
		} catch (error) {
			this.handleError(error);
		}
	};

	upvote = async (subredditName, postId) => {
		try {
			const { data } = await axiosInstance.post(
				`subreddits/${subredditName}/posts/${postId}/upvote`
			);
			return data;
		} catch (error) {
			this.handleError(error);
		}
	};

	handleError = (error) => {
		if (error.response && error.response.data && error.response.data.error) {
			throw new Error(error.response.data.error);
		} else {
			throw new Error(error.message);
		}
	};
}

export default new PostAPI();
