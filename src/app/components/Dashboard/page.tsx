'use client'

import React from 'react'

interface DashboardProps {
    user?: {
        name?: string | null | undefined;
    }
}

const Dashboard = ({user}: DashboardProps) : JSX.Element => {
    return(
        <h1>Hello Dashboard</h1>
    )
}

export default Dashboard