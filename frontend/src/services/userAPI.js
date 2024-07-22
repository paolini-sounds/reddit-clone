import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

class UserAPI {
	getUserProfile = async (username) => {
		try {
			const { data } = await axiosInstance.get(`users/${username}`);
			return data;
		} catch (error) {
			this.handleError(error);
		}
	};

	getUserFeed = async (query) => {
		try {
			const { data } = await axiosInstance.get('users/feed', { params: query });
			return data;
		} catch (error) {
			this.handleError(error);
		}
	};

	getGenericFeed = async (query) => {
		try {
			const { data } = await axiosInstance.get('subreddits/feed', {
				params: query,
			});
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

export default new UserAPI();
