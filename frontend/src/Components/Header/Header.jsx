import React from 'react'
import { useColorMode } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";

const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.8rem"
};

const imageStyle = {
    width: "40px",
    cursor: "pointer"
}



const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <>
            <div className="header" style={headerStyle}>
                <Link to={'/'}>
                    <FaHome size={"36px"} />
                </Link>
                <img
                    style={imageStyle}
                    src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
                    alt="Logo"
                    onClick={toggleColorMode}
                />
                <Link to={'/update'}>
                    <FaRegUserCircle size={"36px"} />
                </Link>
            </div>
        </>
    )
}

export default Header
