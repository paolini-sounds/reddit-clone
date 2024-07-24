import axiosInstance from './axiosInstance';

class AuthApi {
	getUser = async () => {
		try {
			const { data } = await axiosInstance.get('auth/getme');
			return data;
		} catch (error) {
			this.handleError(error);
		}
	};

	register = async (credentials) => {
		try {
			const { data } = await axiosInstance.post('auth/register', credentials);
			return data;
		} catch (error) {
			this.handleError(error);
		}
	};

	login = async (credentials) => {
		try {
			const { data } = await axiosInstance.post('auth/login', credentials);
			return data;
		} catch (error) {
			this.handleError(error);
		}
	};

	logout = async () => {
		try {
			const { data } = await axiosInstance.post('auth/logout');
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
export default new AuthApi();
