import { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

const AuthenticationContext = createContext();

const AuthenticationComponent = (props) => {

    const [user, setUser] = useState({});

    useEffect(() => {

        const loadData = async () => {
            const { data } = await axios.get('/api/users/currentuser');
            setUser(data);
        };

        loadData();

    }, []);

    return (
        <AuthenticationContext.Provider value={{user, setUser} }>
            {props.children }
        </AuthenticationContext.Provider>
    )

};

const useAuthentication = () => useContext(AuthenticationContext);

export { AuthenticationComponent, useAuthentication };