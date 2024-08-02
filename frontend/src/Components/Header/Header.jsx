import React from 'react'
import { Avatar, Icon, Image, useColorMode } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import { useAuthContext } from '../../Context/AuthContext';
import { BiSolidMessageRoundedAdd } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";





const Header = ({ setAuthForm }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { authUser } = useAuthContext();


    const headerStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: `${"space-between"}`,
        padding: "0.8rem"
    };


    return (
        <>
            <div className="header" style={headerStyle}>
                {
                    authUser ? (
                        <Link to={'/'}>
                            {/* <FaHome size={"36px"} /> */}
                            <Icon
                                as={FaHome} // Set the icon component
                                boxSize={{ base: '24px', sm: '30px', md: '36px', lg: '36px' }} 
                                color="fff" // Example color
                            />
                        </Link>
                    ) : (<Link to={'/auth'}
                        style={{ cursor: "pointer" }}
                        onClick={() => { setAuthForm("Login") }}>Login</Link>)
                }
                <Image
                cursor={"pointer"}
                 boxSize={{ base: '40px', sm: '40px', md: '40px', lg: '36px' }} // Responsive size
                    src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
                    alt="Logo"
                    onClick={toggleColorMode}
                />
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                }}>
                    {
                        authUser && (
                            <Link to={'/chat'}>
                                {/* <BiSolidMessageRoundedAdd size={"36px"} /> */}
                                <Icon
                                as={BiSolidMessageRoundedAdd} // Set the icon component
                                boxSize={{ base: '24px', sm: '30px', md: '36px', lg: '36px' }} 
                                color="fff" // Example color
                            />
                            </Link>
                        )
                    }
                    {
                        authUser && (
                            <Link to={'/setting'}>
                                {/* <IoSettingsOutline size={"33px"} /> */}
                                <Icon
                                as={IoSettingsOutline} // Set the icon component
                                boxSize={{ base: '24px', sm: '30px', md: '36px', lg: '34px' }} 
                                color="fff" // Example color
                            />
                            </Link>
                        )
                    }
                    {
                        authUser ? (
                            <Link to={'/update'}>
                                <Avatar size={"sm"}
                                    src={authUser?.profilePic} border={"1px solid #fff"} />
                            </Link>
                        ) : (<Link to={'/auth'}
                            style={{ cursor: "pointer" }}
                            onClick={() => { setAuthForm("Sign-Up") }}>Sign in</Link>)
                    }
                </div>
            </div>
        </>
    )
}

export default Header
