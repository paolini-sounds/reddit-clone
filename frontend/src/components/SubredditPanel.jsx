import {
	Button,
	Center,
	Drawer,
	Flex,
	Heading,
	Spinner,
	VStack,
	useColorModeValue,
	useDisclosure,
	useMediaQuery,
	DrawerOverlay,
	Text,
	DrawerContent,
	IconButton,
	Box,
} from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';
import { LuPanelLeft } from 'react-icons/lu';

import SubredditPanelContents from './SubredditPanelContents';

const SubredditPanel = () => {
	const [isLargerThan960] = useMediaQuery('(min-width: 960px)');
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

	if (!isLargerThan960) {
		return (
			<>
				<IconButton
					ref={btnRef}
					onClick={onOpen}
					size='lg'
					icon={<LuPanelLeft />}
					position='fixed'
				/>
				<Drawer
					isOpen={isOpen}
					placement='left'
					onClose={onClose}
					finalFocusRef={btnRef}
				>
					<DrawerOverlay />
					<DrawerContent>
						<Box mr='auto'>
							<IconButton onClick={onClose} size='lg' icon={<LuPanelLeft />} />
						</Box>
						<SubredditPanelContents />
					</DrawerContent>
				</Drawer>
			</>
		);
	}

	return (
		<Flex height='100dvh' bg={useColorModeValue('gray.50', 'gray.700')}>
			<SubredditPanelContents />
		</Flex>
	);
};

export default SubredditPanel;
