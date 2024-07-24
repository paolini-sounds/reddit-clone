import axiosInstance from './axiosInstance';

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

	editPost = async (subredditName, post, postId) => {
		try {
			const { data } = await axiosInstance.put(
				`subreddits/${subredditName}/posts/${postId}`,
				post
			);
			return data;
		} catch (error) {
			this.handleError(error);
		}
	};

	deletePost = async (subredditName, postId) => {
		try {
			const { data } = await axiosInstance.delete(
				`subreddits/${subredditName}/posts/${postId}`
			);
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

	getComments = async (subredditName, postId) => {
		try {
			const { data } = await axiosInstance.get(
				`subreddits/${subredditName}/posts/${postId}/comments`
			);
			return data;
		} catch (error) {
			this.handleError(error);
		}
	};

	createComment = async (subredditName, postId, comment) => {
		try {
			const { data } = await axiosInstance.post(
				`subreddits/${subredditName}/posts/${postId}/comments`,
				comment
			);
			return data;
		} catch (error) {
			this.handleError(error);
		}
	};

	deleteComment = async (subredditName, postId, commentId) => {
		try {
			const { data } = await axiosInstance.delete(
				`subreddits/${subredditName}/posts/${postId}/comments/${commentId}`
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
