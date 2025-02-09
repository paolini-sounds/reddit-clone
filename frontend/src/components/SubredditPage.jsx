import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
	Center,
	Heading,
	Spinner,
	Flex,
	Box,
	Button,
	HStack,
	Text,
} from '@chakra-ui/react';
import Post from './Post';
import useSubreddit from '../hooks/useSubreddit';
import useAuth from '../hooks/useAuth';

const SubredditPage = () => {
	const { name } = useParams();
	const { authUser, isLoading: authLoading, isLoggedIn } = useAuth();
	const {
		subreddit,
		subscribeUnsubscribe,
		posts,
		error,
		isLoading,
		isError,
		subscribeMutation,
	} = useSubreddit(name);

	if (isLoading || authLoading) {
		return (
			<Center height='100dvh'>
				<Spinner size='xl' />
			</Center>
		);
	}

	console.log(subreddit);
	const isSubscribed =
		isLoggedIn && subreddit.subscribers.includes(authUser._id);
	const subscribers = isLoggedIn && subreddit.subscribers.length;

	return (
		<Flex direction='column' alignItems='center'>
			{isLoggedIn && (
				<Button
					disabled={subscribeMutation.isPending}
					onClick={() => subscribeUnsubscribe(name)}
					margin={5}
					ml='auto'
					size='sm'
				>
					{subscribeMutation.isPending ? (
						<Spinner />
					) : isSubscribed ? (
						'Unsubscribe'
					) : (
						'Subscribe'
					)}
				</Button>
			)}
			<Heading mt={!isLoggedIn && 10}>r/{name}</Heading>
			<Text mb={4}>{subscribers} Subscribers</Text>
			{isLoggedIn && (
				<Button as={Link} to={`/r/${subreddit.name}/create`}>
					Create post in r/{subreddit.name}
				</Button>
			)}
			{isLoading ? (
				<Spinner />
			) : isError ? (
				<Heading>{error.message}</Heading>
			) : (
				<Flex
					direction='column'
					width='100%'
					gap={8}
					padding={10}
					alignItems='center'
				>
					{posts && posts.length > 0 ? (
						posts.map((post) => <Post post={post} subredditName={name} />)
					) : (
						<Box>
							<Heading size='md'>No posts here yet</Heading>
						</Box>
					)}
				</Flex>
			)}
		</Flex>
	);
};

export default SubredditPage;
