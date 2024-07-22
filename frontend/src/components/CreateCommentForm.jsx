import { Button, Flex, FormControl, Heading, Textarea } from '@chakra-ui/react';
import React from 'react';
import useComment from '../hooks/useComment';

const CreateCommentForm = ({ post, subredditName, callback = () => {} }) => {
	const { createCommentMutation } = useComment(subredditName, post._id);
	const [commentText, setCommentText] = React.useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		const content = e.target.content.value;
		createCommentMutation.mutate({ content: commentText });
		callback();
	};

	const handleChange = (e) => {
		setCommentText(e.target.value);
	};

	return (
		<Flex padding={4} gap={4} direction='column'>
			<Heading size='lg'>Create Comment</Heading>
			<form onSubmit={handleSubmit}>
				<Flex alignItems='flex-start' direction='column' gap={4}>
					<FormControl id='content' isRequired>
						<Textarea
							name='content'
							value={commentText}
							placeholder='Enter Comment'
							onChange={handleChange}
						/>
					</FormControl>
					<Button type='submit'>Submit</Button>
				</Flex>
			</form>
		</Flex>
	);
};

export default CreateCommentForm;
