import {
	Drawer,
	Flex,
	useColorModeValue,
	useDisclosure,
	useMediaQuery,
	DrawerOverlay,
	DrawerContent,
	IconButton,
	Box,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { LuPanelLeft } from 'react-icons/lu';

import SubredditPanelContents from './SubredditPanelContents';

const SubredditPanel = () => {
	const [isLargerThan992] = useMediaQuery('(min-width: 992px)');
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

	if (!isLargerThan992) {
		return (
			<>
				<IconButton
					ref={btnRef}
					onClick={onOpen}
					size='lg'
					mt={16}
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
		<Flex
			position='fixed'
			left='0'
			top={'0'}
			pt={16}
			width='250px'
			overflowY='auto'
			height='100dvh'
			bg={useColorModeValue('gray.50', 'gray.700')}
		>
			<SubredditPanelContents />
		</Flex>
	);
};

export default SubredditPanel;
