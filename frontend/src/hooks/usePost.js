import { useMutation, useQueryClient } from '@tanstack/react-query';
import PostAPI from '../services/PostAPI';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

const usePost = (subreddit) => {
	const navigate = useNavigate();
	const toast = useToast();
	const queryClient = useQueryClient();

	const createPostMutation = useMutation({
		mutationFn: ({ subredditName, post }) =>
			PostAPI.createPost(subredditName, post),
		onSuccess: () => {
			queryClient.invalidateQueries(['posts', subreddit]);
			toast({
				title: 'Post created',
				description: 'Your post has been created',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
			navigate(`/r/${subreddit}`);
		},
		onError: (error) => {
			toast({
				title: 'An error occurred.',
				description: error.message,
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
		},
	});

	const upvoteMutation = useMutation({
		mutationFn: ({ subredditName, postId }) =>
			PostAPI.upvote(subredditName, postId),
		onSuccess: () => {
			queryClient.invalidateQueries(['posts', subreddit]);
		},
		onError: (error) => {
			toast({
				title: 'An error occurred.',
				description: error.message,
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
		},
	});

	const createPost = ({ subredditName, post }) => {
		createPostMutation.mutate({ subredditName, post });
	};

	const upvote = ({ subredditName, postId }) => {
		upvoteMutation.mutate({ subredditName, postId });
	};

	return { createPost, upvote };
};
export default usePost;
