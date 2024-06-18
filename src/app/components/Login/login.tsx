"use client"

import React from 'react'
import {signIn} from 'next-auth/react'

export default function Login(){
    const handleLogin = () => {
        signIn('medplum');
    }
    return(
        <div>
            <h1>Great! Your registration is complete! For your security, please click the button below</h1>
            <button onClick={handleLogin}>Verify Identity with Medplum</button>
        </div>
    )
}