import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthentication } from '../AuthenticationContext';

const LogIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [processing, setProcessing] = useState(false);
    const { setUser } = useAuthentication();
    const navigate = useNavigate();
    const [isLoginValid, setIsLoginValid] = useState(true);

    const onButtonClick = async () => {
        setProcessing(true);
        const { data } = await axios.post('/api/users/login', { email, password });
        if (data) {
            setUser(data);
            navigate('/');
        } else {
            setIsLoginValid(false);
            setProcessing(false);
        }
    };

    return (
        <div style={{ backgroundColor: 'aqua' }}>
            <div className='container' style={{ marginTop: 80 }}>
                <div className='col-md-6 offset-3'>
                    <br />
                    <br />
                    <br />
                    <div className='card bg-light'>
                        <div className='card-header'>
                            <h1>Log In Here</h1>
                            {!isLoginValid && <h6 style={{color: 'red'} }>Invalid Login. Please try again.</h6> }
                        </div>
                        <div className='card-body'>
                            <input type='email' name='email' value={email} placeholder='Email' onChange={e => setEmail(e.target.value)} className='form-control' />
                            <br />
                            <input type='password' name='password' value={password} placeholder='Password' onChange={e => setPassword(e.target.value)} className='form-control' />
                            <br />
                        </div>
                        <div className='card-footer'>
                            <button className='btn w-100' style={{ backgroundColor: 'aqua' }} onClick={onButtonClick}>{processing ? 'Processing...' : 'Log In'}</button>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <br />
            </div>
        </div>
    )

};

export default LogIn;