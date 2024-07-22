import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import PostAPI from '../services/PostAPI';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';

const usePost = (subredditName, postId = '') => {
	const navigate = useNavigate();
	const toast = useToast();
	const queryClient = useQueryClient();
	const [enableComments, setEnableComments] = useState(false);

	const createPostMutation = useMutation({
		mutationFn: ({ post }) => PostAPI.createPost(subredditName, post),
		onSuccess: () => {
			queryClient.invalidateQueries(['posts', subredditName]);
			toast({
				title: 'Post created',
				description: 'Your post has been created',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
			navigate(`/r/${subredditName}`);
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

	const editPostMutation = useMutation({
		mutationFn: ({ post }) => PostAPI.editPost(subredditName, post, postId),
		onSuccess: () => {
			queryClient.invalidateQueries(['posts', subredditName]);
			toast({
				title: 'Post updated',
				description: 'Your post has been updated',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
			navigate(`/r/${subredditName}`);
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

	const deletePostMutation = useMutation({
		mutationFn: () => PostAPI.deletePost(subredditName, postId),
		onSuccess: () => {
			queryClient.invalidateQueries(['posts', subredditName]);
			toast({
				title: 'Post deleted',
				description: 'Your post has been deleted',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
			navigate(`/r/${subredditName}`);
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
		mutationFn: () => PostAPI.upvote(subredditName, postId),
		onSuccess: () => {
			queryClient.invalidateQueries(['posts', subredditName]);
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

	const {
		data: comments,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['comments', subredditName],
		queryFn: () => PostAPI.getComments(subredditName, postId),
		enabled: enableComments,
	});

	const createPost = ({ post }) => {
		createPostMutation.mutate({ post });
	};

	const upvote = () => {
		upvoteMutation.mutate();
	};

	const editPost = ({ post }) => {
		editPostMutation.mutate({ post });
	};

	const deletePost = () => {
		deletePostMutation.mutate();
	};

	return {
		createPost,
		editPost,
		deletePost,
		upvote,
		comments,
		upvoteMutation,
		createPostMutation,
		isLoading,
		isError,
		error,
		setEnableComments,
		enableComments,
	};
};
export default usePost;
