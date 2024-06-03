import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

type Role = 'Дисплей' | 'Администратор' | 'Оператор' | 'Терминал' | null;

interface AuthContextProps {
    isAuthenticated: boolean;
    userRole: Role;
    login: string;
    userId: string;
    verifyToken: () => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
    isAuthenticated: false,
    userRole: null,
    userId: '',
    login: '',
    verifyToken: async () => {},
    logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState<Role>(null);
    const [login, setLogin] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const navigate = useNavigate();

    const verifyToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        try {
            const response = await axios.get('/api/Authentication/verify-token', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const decoded = jwtDecode(token) as { primarysid: string, nameid: string; role: Role };
            setLogin(decoded.nameid);
            setUserId(decoded.primarysid)
            if (!response.data.valid || decoded.role == null) {
                setIsAuthenticated(false);
                navigate('/login');
                return;
            }
            if(decoded.role.includes('Оператор')){
                setUserRole('Оператор');
            }
            else {
                setUserRole(decoded.role);
            }
            
            setIsAuthenticated(true);
        } catch (error) {
            setIsAuthenticated(false);
            navigate('/login');
        }
    };

    useEffect(() => {
        verifyToken();
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, login, userId, verifyToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
