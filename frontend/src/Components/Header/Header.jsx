import React from 'react'
import { useColorMode } from '@chakra-ui/react'

const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
                <img
                    style={imageStyle}
                    src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
                    alt="Logo"
                    onClick={toggleColorMode}
                />
            </div>
        </>
    )
}

export default Header
