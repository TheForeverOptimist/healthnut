import React from 'react'
import {signIn} from 'next-auth/react'

export default function Login(){
    const handleLogin = () => {
        signIn('medplum');
    }
    return(
        <div>
            <h1>Login</h1>
            <button onClick={handleLogin}>Verify with Medplum</button>
        </div>
    )
}