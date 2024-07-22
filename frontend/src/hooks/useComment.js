import { useMutation, useQueryClient } from '@tanstack/react-query';
import PostAPI from '../services/PostAPI';

const useComment = (subredditName, postId) => {
	const queryClient = useQueryClient();
	const createCommentMutation = useMutation({
		mutationFn: (comment) =>
			PostAPI.createComment(subredditName, postId, comment),
		onSuccess: () => {
			queryClient.invalidateQueries(['comments', subredditName, postId]);
			refetch();
			toast({
				title: 'Comment created',
				description: 'Your comment has been created',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
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

	const deleteCommentMutation = useMutation({
		mutationFn: (commentId) =>
			PostAPI.deleteComment(subredditName, postId, commentId),
		onSuccess: () => {
			queryClient.invalidateQueries(['comments', subredditName, postId]);
			refetch();
			toast({
				title: 'Comment deleted',
				description: 'Your comment has been deleted',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
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

	const deleteComment = async (commentId) => {
		await deleteCommentMutation.mutateAsync(commentId);
	};

	return { createCommentMutation, deleteComment };
};
export default useComment;
