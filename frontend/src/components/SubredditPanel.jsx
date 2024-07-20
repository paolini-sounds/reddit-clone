import {
	Button,
	Center,
	Flex,
	Heading,
	Spinner,
	VStack,
	useColorModeValue,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import SubredditAPI from '../services/SubredditAPI';
import { Link } from 'react-router-dom';

const SubredditPanel = () => {
	const {
		data: subreddits,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['subreddits'],
		queryFn: SubredditAPI.getAllSubreddits,
	});

	return (
		<Flex
			height='100dvh'
			bg={useColorModeValue('gray.50', 'gray.700')}
			maxWidth='300px'
			boxShadow={4}
		>
			{isLoading ? (
				<Spinner />
			) : (
				<Flex direction='column' p={4} width='100%' alignItems='center'>
					<Heading mt={3} mb={8} size='md'>
						Browse Subreddits
					</Heading>
					<Flex direction='column' width='100%' gap={4}>
						{subreddits.map((subreddit) => (
							<Button
								mr='auto'
								variant='link'
								as={Link}
								to={`/r/${subreddit.name}`}
								key={subreddit._id}
							>
								<Heading size='sm'>{subreddit.name}</Heading>
							</Button>
						))}
					</Flex>
				</Flex>
			)}
		</Flex>
	);
};

export default SubredditPanel;
