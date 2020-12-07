import React from 'react'
import { useAuth } from '../helpers/Auth';

export const HomePage = () => {
    let auth = useAuth();
    
    return (
        <div>
            Content...
            {auth.user ? <div>W00t You're role is {auth.user.role}!</div> : <div>Not Logged In</div>}
        </div>
    )
}