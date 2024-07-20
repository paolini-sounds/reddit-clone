import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

class SubredditAPI {
	getSubreddit = async (name) => {
		try {
			const { data } = await axiosInstance.get(`subreddits/${name}`);
			return data;
		} catch (error) {
			this.handleError(error);
		}
	};

	getAllSubreddits = async () => {
		try {
			const { data } = await axiosInstance.get('subreddits');
			return data;
		} catch (error) {
			this.handleError(error);
		}
	};

	subscribeUnsubscribe = async (name) => {
		try {
			const { data } = await axiosInstance.post(`subreddits/${name}`);
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

export default new SubredditAPI();
