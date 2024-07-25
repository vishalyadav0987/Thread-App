'use client'

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useAuthContext } from '../../Context/AuthContext'


export default function RegisterCard({ setAuthForm }) {
    const [showPassword, setShowPassword] = useState(false);
    const { setAuthUser } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    });

    const handleOnSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/user/register",
                data,
                { headers: { "Content-Type": "application/json" }, withCredentials: true },
            );
            if (response.data.success) {
                // console.log(response.data.data)
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
        } finally {
            setLoading(false);
        }
    }

    return (
        <Flex
            align={'center'}
            justify={'center'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.900')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
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
                                    />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="lastName" isRequired>
                                    <FormLabel>Username</FormLabel>
                                    <Input
                                        type="text"
                                        onChange={(e) => {
                                            setData({ ...data, username: e.target.value })
                                        }}
                                        value={data.username}
                                    />
                                </FormControl>
                            </Box>
                        </HStack>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                onChange={(e) => {
                                    setData({ ...data, email: e.target.value })
                                }}
                                value={data.email}
                            />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={(e) => {
                                        setData({ ...data, password: e.target.value })
                                    }}
                                    value={data.password}
                                />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                isLoading={loading}
                                onClick={handleOnSubmit}
                                loadingText="Submitting"
                                size="lg"
                                bg={useColorModeValue("gray.600", "gray.700")}
                                color={'white'}
                                _hover={{
                                    bg: useColorModeValue("gray.700", "gray.800"),
                                }}>
                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Already have an Account? <Link
                                    onClick={() => { setAuthForm("Login") }}
                                    color={'blue.400'}>Login</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}