import React, { createContext, useState, useContext } from 'react';

interface IAuthContext {
    logged: boolean;
    signIn(email: string, password: string): void;
    sighOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({ children }) => {
    const [logged, setLogged] = useState<boolean> (() => {
        const isLogged = localStorage.getItem('@minha-carteira:logged');

        return !!isLogged;
    });

    const signIn = (email: string, password: string) => {
        if(email === 'flaviomarcosmarinho@gmail.com' && password === '123456') {
            localStorage.setItem('@minha-carteira:logged', 'true');
            setLogged(true);
        } else {
            alert('E-mail ou senha inválidos!');
        }
    }

    const sighOut = () => {
        localStorage.removeItem('@minha-carteira:logged');
        setLogged(false);
    }

    return (
        <AuthContext.Provider value={{logged, signIn, sighOut}}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() : IAuthContext {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };