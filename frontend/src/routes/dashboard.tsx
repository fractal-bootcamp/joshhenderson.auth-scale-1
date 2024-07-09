import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const url = "http://localhost:3000"

const { getToken } = useAuth()

export async function getWorld(args) {
    return fetch((args), {
        headers: { Authorization: `Bearer ${await getToken()}` }
    }).then(res => res.json());
}

export default function DashboardPage() {
    const [world, setWorld] = useState("")
    useEffect(() => {
        const theWorld = getWorld(url)
        setWorld(theWorld)
    }, [])

    return (
        <>
            <h1>Dashboard page</h1>
            <p>This is a protected page.</p>
            <p>{world}</p>
            <ul>
                <li><Link to="/dashboard/extension">Dashboard-Extension</Link></li>
                <li><Link to="/">Return to index</Link></li>
            </ul>
        </>
    );
}