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
import toast from 'react-hot-toast';
import { useAuthContext } from '../../Context/AuthContext';
import axios from 'axios';

export default function LoginCard({ setAuthForm }) {
    const [showPassword, setShowPassword] = useState(false);
    const { setAuthUser } = useAuthContext()
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        username: "",
        password: "",
    });
    const handleOnSubmitLogin = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                'https://thread-app-mc1i.onrender.com/api/v1/user/login',
                data,
                { headers: { "Content-Type": "application/json" }, withCredentials: true },
            );

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
            console.log("Error in handleOnSubmitLogin->", error)
            toast.error(error.message, {
                className: 'custom-toast', // Custom class for styling)
            })
        } finally {
            setLoading(false)
        }
    }
    return (
        <Flex
            align={'center'}
            justify={'center'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Login
                    </Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.900')}
                    boxShadow={'lg'}
                    p={8}
                    w={{
                        base: "full",
                        sm: "400px",
                    }}
                >
                    <Stack spacing={4}>
                        <HStack>
                            <Box style={{ width: "100%" }}>
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
                                onClick={handleOnSubmitLogin}
                                loadingText="Submitting"
                                size="lg"
                                bg={useColorModeValue("gray.600", "gray.700")}
                                color={'white'}
                                _hover={{
                                    bg: useColorModeValue("gray.700", "gray.800"),
                                }}>
                                Login
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Don't have Account? <Link
                                    onClick={() => { setAuthForm("Sign-Up") }}
                                    color={'blue.400'}>Sign Up</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}