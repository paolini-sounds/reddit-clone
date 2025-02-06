import { Flex, Heading, Spinner, Box } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from '../Post';
import React from 'react';

const FeedContents = ({ queryObject, isGeneric = true }) => {
	const { data, error, isLoading, fetchNextPage, hasNextPage } = queryObject;
	const fetchedPostsCount =
		data?.pages.reduce((total, page) => total + page.feed.length, 0) || 0;
	return (
		<Flex direction='column' alignItems='center'>
			<Heading my={10}>{isGeneric ? 'Recent Posts' : 'User Feed'}</Heading>

			{isLoading ? (
				<Spinner />
			) : error ? (
				<Heading>{error.message}</Heading>
			) : (
				<Box width='100%'>
					<InfiniteScroll
						dataLength={fetchedPostsCount}
						hasMore={!!hasNextPage}
						next={() => fetchNextPage()}
						loader={<Spinner />}
					>
						<Flex
							direction='column'
							width='100%'
							gap={8}
							padding={10}
							alignItems='center'
						>
							{data &&
								data?.pages.map((page, index) => (
									<React.Fragment key={index}>
										{page?.feed.map((post, index) => (
											<Post
												post={post}
												key={index}
												subredditName={post.subreddit.name}
											/>
										))}
									</React.Fragment>
								))}
						</Flex>
					</InfiniteScroll>
				</Box>
			)}
		</Flex>
	);
};

export default FeedContents;
