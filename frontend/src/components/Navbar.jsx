import {
	Box,
	Flex,
	HStack,
	Button,
	useColorMode,
	useColorModeValue,
	Heading,
} from '@chakra-ui/react';
import { FaRegMoon } from 'react-icons/fa';
import { MdOutlineWbSunny } from 'react-icons/md';
import { Link } from 'react-router-dom';
import AccountMenu from './AccountMenu';
import React from 'react';
import CreatePostButton from './CreatePostButton';

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Box
			position='fixed'
			top='0'
			left='0'
			width='100%'
			bg={useColorModeValue('gray.100', 'gray.900')}
			pl={4}
			zIndex={100}
		>
			<Flex
				h={16}
				alignItems='center'
				justifyContent='space-between'
				width='100%'
			>
				<Box>
					<Button variant='link' as={Link} to='/'>
						<Heading size='md'>Not Reddit</Heading>
					</Button>
				</Box>
				<HStack ml='auto'>
					{/* <CreatePostButton /> */}
					<Button
						variant={colorMode === 'dark' ? 'ghost' : 'solid'}
						onClick={toggleColorMode}
					>
						{colorMode === 'light' ? <FaRegMoon /> : <MdOutlineWbSunny />}
					</Button>

					<AccountMenu />
				</HStack>
			</Flex>
		</Box>
	);
};

export default Navbar;
