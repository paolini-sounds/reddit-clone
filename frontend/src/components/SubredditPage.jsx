import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import SubredditAPI from '../services/SubredditAPI';
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
	const { subreddit, subscribeUnsubscribe, posts, error, isLoading, isError } =
		useSubreddit(name);

	if (isLoading || authLoading) {
		return (
			<Center height='100dvh'>
				<Spinner size='xl' />
			</Center>
		);
	}

	const isSubscribed = subreddit.subscribers.includes(authUser._id);
	const subscribers = subreddit.subscribers.length;

	return (
		<Flex direction='column' alignItems='center'>
			{isLoggedIn && (
				<Button
					onClick={() => subscribeUnsubscribe(name)}
					margin={5}
					ml='auto'
					size='sm'
				>
					{isSubscribed ? 'Unsubscribe' : 'Subscribe'}
				</Button>
			)}
			<Heading>r/{name}</Heading>
			<Text mb={4}>{subscribers} Subscribers</Text>
			{isLoggedIn && <Button>Create post in r/{subreddit.name}</Button>}
			{isLoading ? (
				<Spinner />
			) : isError ? (
				<Heading>{error.message}</Heading>
			) : (
				<Flex
					direction='column'
					width='100%'
					gap={4}
					padding={10}
					alignItems='center'
				>
					{posts && posts.length > 0 ? (
						posts.map((post) => (
							<Box width='80%' key={post._id}>
								<Post post={post} subredditName={name} />
							</Box>
						))
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
