import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import SubredditAPI from '../services/SubredditAPI';
import { useToast } from '@chakra-ui/react';

const useSubreddit = (name) => {
	const toast = useToast();
	const queryClient = useQueryClient();
	const {
		data: subreddit,
		isLoading,
		error,
		isError,
		refetch,
	} = useQuery({
		queryKey: ['subreddit', name],
		queryFn: () => SubredditAPI.getSubreddit(name),
	});

	const subscribeMutation = useMutation({
		mutationFn: SubredditAPI.subscribeUnsubscribe,
		onSuccess: () => {
			queryClient.invalidateQueries(['subreddit', name]);
			refetch();
			toast({
				title: 'Subscribed',
				description: `Action successful`,
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		},
	});

	const posts = subreddit?.posts;

	const subscribeUnsubscribe = async (name) => {
		await subscribeMutation.mutateAsync(name);
	};

	return {
		subreddit,
		posts,
		subscribeUnsubscribe,
		isLoading,
		error,
		isError,
		subscribeMutation,
	};
};

export default useSubreddit;
