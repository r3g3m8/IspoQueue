import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Admin from './Admin';
import Display from './Display';
import Operator from './Operator';
import Queue from './Queue';
import axios, {AxiosError} from "axios";
import {jwtDecode} from "jwt-decode";
import {message} from "antd";
import User from "../interfaces/User";

type Role = 'Дисплей' | 'Администратор' | 'Опертаор' | 'Терминал' | null;

interface JwtPayload {
    primarysid: string,
    role: Role;
}

function Home() {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // cookie check???
    const [role, setRole] = useState<Role>(null);
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    const fetchUser = async (id: string) => {
        try {
            const response = await axios.get(`/api/User/${id}`);
            console.log(response.data)
            setUser(response.data);
        } catch (err) {
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token) as JwtPayload;
            //setRole(decoded);

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get('/api/Authentication/verify-token')
                .then(response => {
                    if (!response.data.valid) {
                        localStorage.removeItem('token');
                        navigate('/login');
                    }
                    if(decoded.role == null ) {
                        return;
                    }
                    fetchUser(decoded.primarysid);
                    console.log(decoded);
                    
                    if (decoded.role.includes('Оператор')) {
                        setRole('Опертаор');
                    } else if (decoded.role === 'Администратор') {
                        setRole('Администратор');
                    } else if (decoded.role === 'Дисплей') {
                        setRole('Дисплей');
                    } else if (decoded.role === 'Терминал') {
                        setRole('Терминал');
                    }
                    setIsAuthenticated(true);
                })
                .catch(error => {
                    localStorage.removeItem('token');
                    navigate('/login');
                });
        } else {
            navigate('/login');
        }
    }, [navigate]);

  return (
      <>
          {isAuthenticated && user && (<div>
              {role === 'Администратор' ? (
                  <Admin />
              ) : role === 'Дисплей' ? (
                  <Display />
              ) : role === 'Опертаор' ? (
                  <Operator user={user}/>
              ) : (
                  <Queue />
              )}
          </div>) }
      </>
  );
}

export default Home;

