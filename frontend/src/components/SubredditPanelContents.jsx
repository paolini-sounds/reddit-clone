import {
	Button,
	Center,
	Flex,
	Heading,
	Spinner,
	VStack,
	useColorModeValue,
	Text,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import SubredditAPI from '../services/SubredditAPI';
import { Link } from 'react-router-dom';

const SubredditPanelContents = () => {
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
		<>
			{isLoading ? (
				<Spinner />
			) : isError ? (
				<Text>{error.message}</Text>
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
		</>
	);
};

export default SubredditPanelContents;
