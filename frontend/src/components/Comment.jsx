import React from 'react';

import { Button, Divider, Flex, Text, IconButton } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { FaDeleteLeft } from 'react-icons/fa6';

const Comment = ({ comment, handleDelete, isCommentor }) => {
	return (
		<>
			<Divider alignSelf='center' width='90%' color='gray.400' mb={4} />
			<Flex direction='column' alignItems='flex-start' gap={1}>
				<Flex width='100%' justifyContent='space-between'>
					<Button
						variant='link'
						size='sm'
						as={Link}
						to={`/u/${comment.user.username}`}
					>
						u/{comment.user.username}
					</Button>

					{isCommentor && (
						<IconButton
							onClick={handleDelete}
							colorScheme='red'
							variant='ghost'
							size='xs'
							aria-label='Delete Comment'
							icon={<FaDeleteLeft />}
						/>
					)}
				</Flex>

				<Text fontSize='xs'>
					{`${formatDistanceToNow(new Date(comment.createdAt))} ago`}
				</Text>
				<Text p={5}>{comment.content}</Text>
			</Flex>
		</>
	);
};

export default Comment;
