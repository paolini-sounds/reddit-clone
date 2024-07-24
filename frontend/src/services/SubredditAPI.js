import axiosInstance from './axiosInstance';

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
