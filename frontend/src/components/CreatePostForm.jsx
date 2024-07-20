import {
	Flex,
	FormControl,
	FormLabel,
	Input,
	Textarea,
	VStack,
	Heading,
	Button,
	FormErrorMessage,
} from '@chakra-ui/react';
import React from 'react';
import usePost from '../hooks/usePost';
import usePostForm from '../hooks/usePostForm';
import { useParams } from 'react-router-dom';

const CreatePostForm = () => {
	const { name } = useParams();
	const { createPost } = usePost(name);
	const { formData, errors, handleInputChange, handleSubmit } = usePostForm(
		name,
		createPost
	);

	return (
		<Flex direction='column' alignItems='center' gap={5}>
			<Heading textAlign='center'>Create Post in r/{name}</Heading>
			<form onSubmit={handleSubmit}>
				<Flex
					direction='column'
					align='center'
					gap={6}
					my={10}
					minWidth={['250px', '400px', '500px']}
				>
					<FormControl id='title' isInvalid={errors.title} isRequired>
						<FormLabel>Title</FormLabel>
						<Input
							type='text'
							name='title'
							value={formData.title}
							onChange={handleInputChange}
						/>
						{errors.title && (
							<FormErrorMessage>{errors.title}</FormErrorMessage>
						)}
					</FormControl>
					<FormControl id='content' isInvalid={errors.content} isRequired>
						<FormLabel>Content</FormLabel>
						<Textarea
							type='text'
							name='content'
							value={formData.content}
							onChange={handleInputChange}
							size='lg'
							resize='vertical'
						/>
						{errors.content && (
							<FormErrorMessage>{errors.content}</FormErrorMessage>
						)}
					</FormControl>
					<Button type='submit'>Create Post</Button>
				</Flex>
			</form>
		</Flex>
	);
};

export default CreatePostForm;
