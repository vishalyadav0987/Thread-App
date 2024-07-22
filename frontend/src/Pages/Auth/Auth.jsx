import React, { useState } from 'react'
import RegisterCard from '../../Components/RegisterCard/RegisterCard'
import LoginCard from '../../Components/LoginCard/LoginCard'

const Auth = () => {
    const [authForm, setAuthForm] = useState("Login")
    return (
        <div>
            {
                authForm === "Login"
                    ? <LoginCard setAuthForm={setAuthForm} />
                    : <RegisterCard setAuthForm={setAuthForm} />
            }
        </div>
    )
}

export default Auth