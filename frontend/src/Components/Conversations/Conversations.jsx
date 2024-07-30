import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import React from 'react'

const Conversations = () => {
    return (
        <>
            <div className='conversation-with'
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 5px",
                    cursor: "pointer",
                    borderBottom: "1px solid #323232",
                    transition: "all 3ms ease"
                }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                }}>
                    <div>
                        <AvatarGroup size="md" max={2}>
                            <Avatar src='./profile.png' alt="User profile" name="User Name">
                                <AvatarBadge boxSize="1em" bg="green.500" />
                            </Avatar>
                        </AvatarGroup>
                    </div>
                    <div>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px"
                        }}>
                            <span>Vishalyadav_0987</span>
                            <img src="./verified.png" alt="" style={{
                                width: "18px"
                            }} />
                        </div>
                        <b style={{
                            fontSize: "0.9rem"
                        }}>Hi my name is vishal...</b>
                    </div>
                </div>
                <div style={{
                    color: "#4d4d4d",
                    fontSize: "1rem"
                }}>
                    1d
                </div>

            </div>
        </>
    )
}

export default Conversations
