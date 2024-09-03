import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthentication } from '../AuthenticationContext';

const LogOut = () => {

    const { setUser } = useAuthentication();
    const navigate = useNavigate();

    useEffect(() => {

        const loggingOut = async () => {
            await axios.post('/api/users/logout');
            setUser(null);
            navigate('/');
        };

        loggingOut();

    }, []);


    return (<></>);

};

export default LogOut;