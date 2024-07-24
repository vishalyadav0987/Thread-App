'use client'

import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Avatar,
    HStack,
    Center,
    Box
} from '@chakra-ui/react'
import { useAuthContext } from '../../Context/AuthContext';
import { useRef, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import usePreviewImg from '../../CustomHook/usePreviewImg';

export default function UpdateProfile() {
    const { authUser, setAuthUser } = useAuthContext();
    const [data, setData] = useState({
        name: authUser.name,
        username: authUser.username,
        email: authUser.email,
        password: "",
        bio: authUser.bio,
    });
    const fileRef = useRef(null);

    const { imageChangeHandle, imageUrl } = usePreviewImg();

    const handleOnSubmitUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:3000/api/v1/user/update/${authUser._id}`,
                { ...data, profilePic: imageUrl },
                {
                    headers: { "Content-Type": "application/json" }, withCredentials: true
                },
            );
            console.log(response)
            if (response.data.success) {
                toast.success(response.data.message, {
                    className: 'custom-toast', // Custom class for styling)
                }
                )
                localStorage.setItem("user-threads", JSON.stringify(response.data.data));
                setAuthUser(response.data.data)
            }
            else {
                toast.error(response.data.message, {
                    className: 'custom-toast', // Custom class for styling)
                })
            }
        } catch (error) {
            console.log("Error in handleOnSubmit->", error)
            toast.error(error.message, {
                className: 'custom-toast', // Custom class for styling)
            })
        }
    }
    return (
        <form onSubmit={handleOnSubmitUpdate}>
            <Flex
                align={'center'}
                justify={'center'}
            >
                <Stack
                    spacing={4}
                    w={'full'}
                    maxW={'md'}
                    bg={useColorModeValue('white', 'gray.900')}
                    rounded={'xl'}
                    boxShadow={'lg'}
                    p={6}
                    my={8}>
                    <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                        User Profile Edit
                    </Heading>
                    <FormControl id="userName">
                        <Stack direction={['column', 'row']} spacing={6}>
                            <Center>
                                <Avatar
                                    mt={"10px"}
                                    boxShadow={"md"}
                                    size="xl" src={imageUrl || authUser.profilePic}></Avatar>
                            </Center>
                            <Center w="full">
                                <Button w="full"
                                    onClick={() => fileRef.current.click()}
                                >Change Icon</Button>
                                <Input type='file' hidden ref={fileRef} onChange={imageChangeHandle} />
                            </Center>
                        </Stack>
                    </FormControl>
                    <HStack>
                        <Box>
                            <FormControl id="firstName" isRequired>
                                <FormLabel>Full Name</FormLabel>
                                <Input
                                    type="text"
                                    onChange={(e) => {
                                        setData({ ...data, name: e.target.value })
                                    }}
                                    value={data.name}
                                    placeholder="name"
                                    _placeholder={{ color: 'gray.500' }}
                                />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl id="userName" isRequired>
                                <FormLabel>Username</FormLabel>
                                <Input
                                    type="text"
                                    onChange={(e) => {
                                        setData({ ...data, username: e.target.value })
                                    }}
                                    value={data.username}
                                    placeholder="username"
                                    _placeholder={{ color: 'gray.500' }}
                                />
                            </FormControl>
                        </Box>
                    </HStack>
                    <FormControl id="email" isRequired>
                        <FormLabel>Email address</FormLabel>
                        <Input
                            placeholder="your-email@example.com"
                            _placeholder={{ color: 'gray.500' }}
                            type="email"
                            onChange={(e) => {
                                setData({ ...data, email: e.target.value })
                            }}
                            value={data.email}
                        />
                    </FormControl>
                    <FormControl id="firstName" isRequired>
                        <FormLabel>Bio</FormLabel>
                        <Input
                            placeholder="bio"
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                            onChange={(e) => {
                                setData({ ...data, bio: e.target.value })
                            }}
                            value={data.bio}
                        />
                    </FormControl>
                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input
                            placeholder="password"
                            _placeholder={{ color: 'gray.500' }}
                            type="password"
                            onChange={(e) => {
                                setData({ ...data, password: e.target.value })
                            }}
                            value={data.password}
                        />
                    </FormControl>
                    <Stack spacing={6} direction={['column', 'row']}>
                        <Button
                            bg={'red.400'}
                            color={'white'}
                            w="full"
                            _hover={{
                                bg: 'red.500',
                            }}>
                            Cancel
                        </Button>
                        <Button
                            bg={'green.500'}
                            color={'white'}
                            w="full"
                            _hover={{
                                bg: 'green.700',
                            }}
                            type='submit'
                        >
                            Submit
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
        </form>
    )
}