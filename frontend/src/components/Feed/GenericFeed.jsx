import { useInfiniteQuery } from '@tanstack/react-query';
import UserAPI from '../../services/UserAPI';
import FeedContents from './FeedContents';

const GenericFeed = () => {
	const queryObject = useInfiniteQuery({
		queryKey: ['userFeed'],
		queryFn: ({ pageParam = 1 }) => UserAPI.getGenericFeed({ page: pageParam }),
		getNextPageParam: (lastPage) => {
			return lastPage.next ? lastPage.next : undefined;
		},
	});

	return <FeedContents queryObject={queryObject} />;
};

export default GenericFeed;
