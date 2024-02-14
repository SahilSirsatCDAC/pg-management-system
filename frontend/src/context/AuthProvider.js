// import { createContext, useState } from "react";

// const AuthContext = createContext({});

// export const AuthProvider = ({ children }) => {
//     const [auth, setAuth] = useState({});

//     // setAuth({'email': localStorage.getItem('email'), 'password': localStorage.getItem('password'), 'roles':localStorage.getItem('roles'), 'accessToken' :localStorage.getItem('accessToken') });
//     return (
//         <AuthContext.Provider value={{ auth, setAuth }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

// export default AuthContext;

import { createContext, useState } from "react";
import React, { useEffect } from 'react'

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({})
    // useState React hook
    useEffect(() => {
        console.log("-------------")
        console.log(auth)
        console.log(auth?.email === undefined)
        if (auth?.email === undefined) {
            setAuth({
                email: localStorage.getItem('email'),
                password: localStorage.getItem('password'),
                roles: localStorage.getItem('roles')?.split(','),
                accessToken: localStorage.getItem('accessToken')
            })
        }
    }, [auth])

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;