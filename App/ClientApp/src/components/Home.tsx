import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Admin from './Admin';
import Display from './Display';
import Operator from './Operator';
import Queue from './Queue';
import axios from 'axios';
import User from '../interfaces/User';
import {useAuth} from "./AuthContext";

function Home() {
    const { isAuthenticated, userRole, userId } = useAuth();
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async (id: string) => {
            try {
                const response = await axios.get(`/api/User/${id}`);
                setUser(response.data);
            } catch (err) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        };

        if (isAuthenticated && (userRole === 'Оператор' || userRole === 'Администратор')) {
            fetchUser(userId);
        }
    }, [isAuthenticated, userRole, userId, navigate]);

    return (
        <>
            {isAuthenticated && (
                <div>
                    {userRole === 'Администратор' ? (
                        <Admin />
                    ) : userRole === 'Дисплей' ? (
                        <Display />
                    ) : userRole === 'Оператор' && user ? (
                        <Operator user={user} />
                    ) : userRole === 'Терминал' ? (
                        <Queue />
                    ) : <></>}
                </div>
            )}
        </>
    );
}

export default Home;
