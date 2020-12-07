import React, { useState, useEffect, useContext, createContext, ReactNode } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { API_URL } from "../constants";

const authContext = createContext({
    user: {
        authenticated: false,
        token: '',
        role: '',
    },
    signin: null,
    signout: null,
});

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }: { children: ReactNode }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
  
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
    return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
    const [user, setUser] = useState(null);

    const signin = (email: string, password: string) => {
        axios
        .post(
            API_URL + "/auth/login",
            {
                email,
                password,
            }
        )
        .then(response => {
            console.log("Login Response:", response);
            if (response.status === 200) {
                const authData = {...{ authenticated: true }, ...response.data.data}
                setUser(authData);
            }
        })
        .catch(error => {
            console.log("Login Error:", error);
        })
    };
  
    const signout = () => {
        setUser(false);
    };
  
    // Subscribe to user on mount
    // Because this sets state in the callback it will cause any ...
    // ... component that utilizes this hook to re-render with the ...
    // ... latest auth object.
    useEffect(() => {
    //   const unsubscribe = firebase.auth().onAuthStateChanged(user => {
    //     if (user) {
    //       setUser(user);
    //     } else {
    //       setUser(false);
    //     }
    //   });
  
    //   // Cleanup subscription on unmount
    //   return () => unsubscribe();
    }, []);
    
    // Return the user object and auth methods
    return {
      user,
      signin,
      signout,
    };
}