import { useState } from 'react';
import useAuth from '../hooks/useAuth';

const useAuthForm = (authAction) => {
	const initialFormData = {
		email: '',
		username: '',
		password: '',
		confirmpassword: '',
		errors: {
			email: false,
			password: false,
			confirmpassword: false,
			username: false,
			invalidCredentials: false,
		},
	};
	const { register, login } = useAuth();
	const [isTyping, setIsTyping] = useState(false);
	const [formData, setFormData] = useState(initialFormData);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { email, password, confirmpassword, username } = formData;

		let hasErrors = false;

		if (formData.email.length < 3) {
			setFormData((prev) => ({
				...prev,
				errors: { ...prev.errors, email: true },
			}));
			hasErrors = true;
		}

		if (authAction === 'signup' && formData.username.length < 3) {
			setFormData((prev) => ({
				...prev,
				errors: { ...prev.errors, username: true },
			}));
			hasErrors = true;
		}

		if (formData.password.length < 6) {
			setFormData((prev) => ({
				...prev,
				errors: { ...prev.errors, password: true },
			}));
			hasErrors = true;
		}

		if (authAction === 'signup' && formData.confirmpassword !== password) {
			setFormData((prev) => ({
				...prev,
				errors: { ...prev.errors, confirmpassword: true },
			}));
			hasErrors = true;
		}

		if (hasErrors) return;

		try {
			if (authAction === 'signup') {
				await register({
					email: formData.email,
					password: formData.password,
					username: formData.username,
				});
			} else if (authAction === 'login')
				await login({ email: formData.email, password: formData.password });
		} catch (error) {
			console.error(error);
		} finally {
			setIsTyping(false);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
			errors: {
				...prev.errors,
				[name]: false,
			},
		}));
		setIsTyping(true);
	};

	const hasFormErrors =
		formData.errors.email ||
		formData.errors.password ||
		formData.errors.confirmpassword ||
		formData.errors.username;

	return {
		isTyping,
		hasFormErrors,
		errors: formData.errors,
		handleSubmit,
		handleInputChange,
	};
};

export default useAuthForm;
