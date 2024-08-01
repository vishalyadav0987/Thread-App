import React from 'react'
import RegisterCard from '../../Components/RegisterCard/RegisterCard'
import LoginCard from '../../Components/LoginCard/LoginCard'

const Auth = ({ authForm, setAuthForm }) => {

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