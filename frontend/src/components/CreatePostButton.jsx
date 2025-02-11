import { Button } from '@chakra-ui/react';
import React from 'react';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const CreatePostButton = () => {
	useAuth();
	return (
		<Button as={Link} to={'/create'}>
			➕ Create
		</Button>
	);
};

export default CreatePostButton;
