import { useState } from 'react';

const usePostForm = (callback, post) => {
	const initialValues = {
		title: post?.title || '',
		content: post?.content || '',
	};
	const [formData, setFormData] = useState(initialValues);
	const [errors, setErrors] = useState({});

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!formData.title || !formData.content) {
			setErrors({ title: 'Title is required', content: 'Content is required' });
			return;
		}
		if (formData.title.length < 3) {
			setErrors({ title: 'Title must be at least 3 characters long' });
			return;
		}
		if (errors.title || errors.content) {
			return;
		}
		callback({
			post: formData,
		});
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setErrors((prev) => ({ ...prev, [name]: null }));
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	return {
		formData,
		errors,
		handleSubmit,
		handleInputChange,
	};
};

export default usePostForm;
